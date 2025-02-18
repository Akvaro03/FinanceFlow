import { auth, db } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  collection,
  addDoc,
  increment,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Definir tipos
interface User {
  uid: string;
  email: string;
  name?: string;
  role?: string;
  balance: number;
  monthlySalary: number;
  paymentMethods: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (
    email: string,
    password: string,
    additionalData?: Partial<User>
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  addTransaction: (transaction: Transaction) => Promise<void>;
  deleteTransaction: (transactionId: string, amount: number, type: "income" | "expense") => Promise<void>;
}
interface Transaction {
  id?: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  paymentMethod: string;
  date: Date;
  description: string;
}

// Crear contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setUser({ uid: firebaseUser.uid, email: firebaseUser.email || "", ...userDoc.data() } as User);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /**
   * Registra un nuevo usuario en Firebase Auth y lo almacena en Firestore
   */
  const register = async (
    email: string,
    password: string,
    additionalData?: Partial<User>
  ) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    const userData: User = {
      uid: user.uid,
      email,
      name: additionalData?.name || "",
      role: additionalData?.role || "user",
      balance: 0, // Inicializamos balance en 0
      monthlySalary: 0,
      paymentMethods: ["Efectivo"], // Inicialmente solo efectivo
    };

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
    });

    setUser(userData);
  };

  /**
   * Inicia sesión con email y contraseña
   */
  const login = async (email: string, password: string) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (userDoc.exists()) {
      setUser({
        uid: user.uid,
        email: user.email || "",
        ...userDoc.data(),
      } as User);
    }
  };

  /**
   * Cierra la sesión del usuario
   */

  const addTransaction = async (transaction: Transaction) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const transactionsRef = collection(userRef, "transactions");

    // Agregar transacción a Firestore
    const newTransactionRef = await addDoc(transactionsRef, {
      ...transaction,
      date: transaction.date,
      createdAt: serverTimestamp(),
    });

    // Actualizar el balance del usuario
    const amountChange = transaction.type === "income" ? transaction.amount : -transaction.amount;
    await updateDoc(userRef, { balance: increment(amountChange) });

    // Actualizar estado local
    setUser((prev) => prev ? { ...prev, balance: prev.balance + amountChange } : prev);
  };

  /**
   * Eliminar una transacción y ajustar el balance
   */
  const deleteTransaction = async (transactionId: string, amount: number, type: "income" | "expense") => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const transactionRef = doc(db, "users", user.uid, "transactions", transactionId);

    // Eliminar transacción de Firestore
    await deleteDoc(transactionRef);

    // Ajustar balance
    const amountChange = type === "income" ? -amount : amount;
    await updateDoc(userRef, { balance: increment(amountChange) });

    // Actualizar estado local
    setUser((prev) => prev ? { ...prev, balance: prev.balance + amountChange } : prev);
  };


  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, addTransaction, deleteTransaction }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

import { auth, db } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Definir tipos
interface User {
  uid: string;
  email: string;
  name?: string;
  role?: string;
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
}

// Creamos el contexto con un valor inicial vacío
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor del contexto
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        setUser({ uid: firebaseUser.uid, email: firebaseUser.email || "", ...userDoc.data() } as User);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  const register = async (
    email: string,
    password: string,
    additionalData?: Partial<User>
  ) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userData: User = { uid: user.uid, email, ...additionalData };

    await setDoc(doc(db, "users", user.uid), userData);
    setUser(userData);
  };

  const login = async (email: string, password: string) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, "users", user.uid));

    setUser({
      uid: user.uid,
      email: user.email || "",
      ...userDoc.data(),
    } as User);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

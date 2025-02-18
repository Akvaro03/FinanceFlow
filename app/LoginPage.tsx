import AuthForm from "@/components/AuthForm";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "./context/authContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useState } from "react";

function LoginPage() {
  const [mode, setMode] = useState<"register" | "login">("register");
  const { register } = useAuth();
  const handleRegister = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    register(email, password);
  };
  const toggleMode = () =>{
    setMode(() =>(mode === "register" ? "login" : "register"))
  }
  return (
    <SafeAreaView style={styles.container}>
      <AuthForm
        onSubmit={handleRegister}
        toggleMode={toggleMode}
        mode={mode}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  containerForm: {
    display: "flex",
    backgroundColor: "#1F2937",
    width: "80%",
    height: "40%",
    borderRadius: 10,
    borderColor: "#00ff99",
    borderWidth: 4,
    borderStyle: "solid",
    justifyContent: "center",
  },
  containerTittle: {
    display: "flex",
    height: "20%",
    alignItems: "center",
  },
  TittleText: {
    color: "#00ff99",
    fontSize: 30,
    fontWeight: "bold",
  },
  FormUser: {
    height: "50%",
  },
});

export default LoginPage;

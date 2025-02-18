import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface AuthFormInterface {
  mode: "login" | "register";
  onSubmit: (email: string, password: string, confirmPassword: string) => void;
  toggleMode: () => void;
}

function AuthForm({ mode, onSubmit, toggleMode }: AuthFormInterface) {
  const isLogin = mode === "login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={styles.containerForm}>
      <Text style={styles.titleText}>
        {isLogin ? "Iniciar Sesión" : "Registrarse"}
      </Text>
      <View>
        <TextInput
          placeholder="Email"
          placeholderTextColor={"#bbb"}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor={"#bbb"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {!isLogin && (
          <TextInput
            placeholder="Confirmar Contraseña"
            placeholderTextColor={"#bbb"}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onSubmit(email, password, confirmPassword)}
      >
        <Text style={styles.buttonText}>
          {isLogin ? "Ingresar" : "Registrarse"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleMode}>
        <Text style={styles.switchText}>
          {isLogin
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Inicia sesión"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 20,
  },
  containerForm: {
    width: "85%",
    backgroundColor: "#1F2937",
    height: "50%",
    padding: 20,
    borderRadius: 10,
    borderColor: "#00ff99",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    color: "#00ff99",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#333",
    color: "#fff",
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#00ff99",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#121212",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchText: {
    color: "#bbb",
    marginTop: 15,
    textDecorationLine: "underline",
  },
});

export default AuthForm;

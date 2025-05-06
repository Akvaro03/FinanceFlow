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
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "", confirmPassword: "" };

    if (!form.email.includes("@")) {
      newErrors.email = "Email inválido";
      valid = false;
    }

    if (form.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
      valid = false;
    }

    if (!isLogin && form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(form.email, form.password, form.confirmPassword);
    }
  };

  return (
    <View style={styles.containerForm}>
      <Text style={styles.titleText}>
        {isLogin ? "Iniciar Sesión" : "Registrarse"}
      </Text>

      {/* Campo Email */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
          textContentType="emailAddress"
        />
        {errors.email !== "" && (
          <Text style={styles.errorText}>{errors.email}</Text>
        )}
      </View>

      {/* Campo Contraseña */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Contraseña"
          placeholderTextColor="#888"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
          textContentType="password"
        />
        {errors.password !== "" && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>

      {/* Confirmar contraseña solo si no es login */}
      {!isLogin && (
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              errors.confirmPassword && styles.inputError,
            ]}
            placeholder="Confirmar Contraseña"
            placeholderTextColor="#888"
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
            textContentType="password"
          />
          {errors.confirmPassword !== "" && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
  containerForm: {
    width: "90%",
    backgroundColor: "#1f1f1f",
    padding: 24,
    borderRadius: 16,
    borderColor: "#00ff99",
    borderWidth: 1.5,
    alignItems: "center",
    shadowColor: "#00ff99",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  titleText: {
    color: "#00ff99",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 14,
  },
  input: {
    backgroundColor: "#2b2b2b",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#444",
    fontSize: 16,
  },
  inputError: {
    borderColor: "#ff4d4d",
  },
  errorText: {
    color: "#ff4d4d",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  button: {
    backgroundColor: "#00ff99",
    paddingVertical: 14,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#121212",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchText: {
    color: "#aaa",
    marginTop: 18,
    textDecorationLine: "underline",
  },
});

export default AuthForm;

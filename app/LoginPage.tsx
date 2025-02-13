import AuthForm from "@/components/AuthForm";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

function LoginPage() {
  return (
    <SafeAreaView style={styles.container}>
      <AuthForm mode="login"/>
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
  FormUser:{
    height:"50%"
  }
});

export default LoginPage;

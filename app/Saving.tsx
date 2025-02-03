import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";

function Savings() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceHeaderText}>Total</Text>
        <Text style={styles.balanceText}>$40.115</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.balanceHeaderText}>Tus reservas</Text>
        <View>
          <Button title="Tus reservas" />
          <Button title="Tus reservas" />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#1e1e1e",
    alignItems: "center",
  },
  balanceContainer: {
    width: "80%",
    marginVertical: 20,
    backgroundColor: "#121212",
    padding: 10,
    borderRadius: 10,
  },
  balanceHeaderText: {
    fontSize: 16,
    color: "grey",
  },
  balanceText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  buttonContainer: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
  },
});

export default Savings;

import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";

function CardCustom({ children }: { children: ReactElement[] }) {
  return <View style={styles.CardCustom}>{children}</View>;
}

const styles = StyleSheet.create({
  CardCustom: {
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 10,
  },
});
export default CardCustom;

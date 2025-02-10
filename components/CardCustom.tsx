import { ReactElement } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

function CardCustom({
  children,
  style,
}: {
  children?: ReactElement[];
  style?: ViewStyle;
}) {
  return (
    <Animated.View
      entering={FadeInUp.duration(700)} // Animación de entrada
      style={[styles.CardCustom, style]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  CardCustom: {
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
  },
});
export default CardCustom;

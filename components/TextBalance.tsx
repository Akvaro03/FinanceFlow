import { StyleSheet, Text, TextStyle } from "react-native";

function TextBalance({
  children,
  style,
}: {
  children: string;
  style?: TextStyle;
}) {
  const isAdd = children.slice(0, 1) === "+";
  return (
    <Text style={[isAdd ? styles.textAdd : styles.textRes, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  textAdd: {
    color: "#00ff99",
  },
  textRes: {
    color: "#ff6961",
  },
});

export default TextBalance;

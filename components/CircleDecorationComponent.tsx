import { StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

function CircleDecorationComponent({
  positionCircle,
  size,
}: {
  positionCircle: { top: number; left: number };
  size: number;
}) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const circleSize = useSharedValue(SCREEN_WIDTH * size); // Inicia pequeño

  const animatedStyle = useAnimatedStyle(() => ({
    borderRadius: circleSize.value,
    height: circleSize.value,
    width: circleSize.value,
    left: positionCircle.left,
    top: positionCircle.top,
    backgroundColor: "#8A2BE2",
  }));
  return <Animated.View style={[styles.CircleContainer, animatedStyle]} />;
}
const styles = StyleSheet.create({
  CircleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default CircleDecorationComponent;

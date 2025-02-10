import { useEffect } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type CircleAnimationComponentProps = {
  color?: string;
  size: "small" | "medium" | "large";
};

function CircleAnimationComponent({
  color = "#8A2BE2",
  size,
}: CircleAnimationComponentProps) {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const circleSize = useSharedValue(SCREEN_WIDTH * 0.3); // Inicia pequeño

  useEffect(() => {
    // Expandir el círculo para cubrir toda la pantalla
    circleSize.value = withTiming(
      Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) * sizeCircle[size],
      {
        duration: 800,
      }
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    width: circleSize.value,
    height: circleSize.value,
    borderRadius: circleSize.value,
    backgroundColor: color,
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

const sizeCircle = {
  small: 1.5,
  medium: 1.5,
  large: 2.5,
};
// enum sizeCircle {
//   "small" = 1.2,
//   "medium" = 1.5,
//   "large" = 2.5,
// }

export default CircleAnimationComponent;

import React from "react";
import { StyleSheet } from "react-native";
import {
  State,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const Shutter = ({ onClick }: { onClick: () => any }) => {
  const pressed = useSharedValue(false);
  const handleStateChange = (event: TapGestureHandlerGestureEvent) => {
    switch (event.nativeEvent.state) {
      case State.BEGAN:
        pressed.value = true;
        break;
      case State.END:
        pressed.value = false;
        onClick();
        break;
      default:
        break;
    }
  };

  const uas = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? "pink" : "red",
      transform: [{ scale: pressed.value ? 1.1 : 1 }],
    };
  });

  return (
    <TapGestureHandler onHandlerStateChange={handleStateChange}>
      <Animated.View style={[styles.shutter, uas]} />
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  shutter: {
    backgroundColor: "red",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default Shutter;

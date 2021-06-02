import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default {
  cameraHeight: height - 200,
  cameraWidth: width - 32,
  window: {
    height,
    width,
  },
};

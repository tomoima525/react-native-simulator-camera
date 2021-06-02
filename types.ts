import { StackNavigationProp } from "@react-navigation/stack";
import type { PictureResult } from "src/modules/Camera";

type StackParamList = {
  Camera: undefined;
  Home: undefined;
  PhotoResult: { picture: PictureResult };
};

export type StackNavigationProps<T extends keyof StackParamList> =
  StackNavigationProp<StackParamList, T>;

// Camera Wrapper to run on simulator

import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import * as FileSystem from "expo-file-system";
import * as DeviceInfo from "expo-device";
import * as Random from "expo-random";
import {
  Camera,
  CameraCapturedPicture,
  CameraPictureOptions,
} from "expo-camera";

const mockDLUrl = () => {
  const size = Math.ceil(Math.random() * 6) * 120;
  return `https://baconmockup.com/${size}/${size}`;
};

export type CameraType = "back" | "front";
export type PictureResult =
  | CameraCapturedPicture
  | {
      uri: string;
    };

interface CameraProps {
  onCameraReady: () => void;
  style: StyleProp<ViewStyle>;
  type: CameraType;
}

export interface CameraRef {
  pausePreview: () => void;
  resumePreview: () => void;
  takePictureAsync: (options: CameraPictureOptions) => Promise<PictureResult>;
}

const typeMap = {
  back: Camera.Constants.Type.back,
  front: Camera.Constants.Type.front,
};

const randomString = () => {
  return Random.getRandomBytes(8).toString();
};

/**
 * Camera Wrapper to support simulator
 */
const CameraWrapper = forwardRef<CameraRef, CameraProps>((props, ref) => {
  const cameraRef = React.useRef<Camera | null>(null);
  const isEmulator = !DeviceInfo.isDevice;
  const { style, onCameraReady, type } = props;
  const cameraType = typeMap[type];

  useEffect(() => {
    if (isEmulator) {
      onCameraReady();
    }
  }, [isEmulator, onCameraReady]);

  const takePictureAsync = async (
    options: CameraPictureOptions
  ): Promise<PictureResult> => {
    if (cameraRef.current instanceof Camera) {
      return cameraRef?.current?.takePictureAsync(options);
    }

    // When running on a simulator, get random file from the internet
    const downloadPath = `${
      FileSystem.documentDirectory
    }/${randomString()}.jpg`;
    await FileSystem.downloadAsync(mockDLUrl(), downloadPath);
    return {
      uri: downloadPath,
    };
  };

  const pausePreview = () => {
    if (cameraRef.current instanceof Camera) {
      cameraRef.current.pausePreview();
    }
  };

  const resumePreview = () => {
    if (cameraRef.current instanceof Camera) {
      cameraRef.current.resumePreview();
    }
  };

  useImperativeHandle(ref, () => ({
    pausePreview,
    resumePreview,
    takePictureAsync,
  }));
  return (
    <>
      {isEmulator ? (
        <View style={style} />
      ) : (
        <Camera
          ref={cameraRef}
          onCameraReady={onCameraReady}
          style={style}
          type={cameraType}
        />
      )}
    </>
  );
});

export const requestCameraPermission = Camera.requestPermissionsAsync;

export default CameraWrapper;

import React from "react";
import { StyleSheet, View } from "react-native";
import { PermissionStatus } from "expo-camera";
import Layout from "src/constants/Layout";

import CameraModule from "src/modules/Camera";
import type { CameraRef, CameraType } from "src/modules/Camera";

const baseStyle = StyleSheet.create({
  camera: {
    backgroundColor: "#9CA7B4",
    borderColor: "#000000",
    borderRadius: 8,
    borderWidth: 6,
    height: Layout.cameraHeight,
    overflow: "hidden",
    width: Layout.cameraWidth,
  },
});

const styles = StyleSheet.create({
  camera: {
    ...baseStyle.camera,
  },
  permissionRequestContainer: {
    ...baseStyle.camera,
    backgroundColor: "#000000",
  },
});

interface CameraViewProps {
  cameraRef: React.MutableRefObject<CameraRef | null>;
  onCameraReady: () => void;
  permission: PermissionStatus | null;
  type: CameraType;
}
const CameraView: React.FC<CameraViewProps> = ({
  cameraRef,
  onCameraReady,
  permission,
  type,
}) => {
  if (permission === PermissionStatus.GRANTED) {
    return (
      <CameraModule
        ref={cameraRef}
        onCameraReady={onCameraReady}
        style={styles.camera}
        type={type}
      />
    );
  }
  if (permission === PermissionStatus.DENIED) {
    return <View style={styles.permissionRequestContainer} />;
  }

  return <View style={styles.camera} />;
};

export default CameraView;

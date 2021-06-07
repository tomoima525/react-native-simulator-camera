import React, { useCallback, useEffect, useRef, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { PermissionStatus } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

import Shutter from "src/components/Shutter";
import Layout from "src/constants/Layout";
import { requestCameraPermission } from "src/modules/Camera";
import type { CameraRef } from "src/modules/Camera";
import type { StackNavigationProps } from "types";

import CameraView from "src/components/CameraView";

const styles = StyleSheet.create({
  buttonColumnContainer: {
    flexDirection: "column",
    height: 128,
    justifyContent: "space-between",
  },
  buttonContainer: {
    alignItems: "center",
    height: 52,
    justifyContent: "center",
    width: 52,
  },
  cameraBtnContainer: {
    alignItems: "center",
    flexDirection: "row",
    height: 100,
    justifyContent: "space-between",
    padding: 26,
    width: "100%",
  },
  cameraBtnSpacing: { width: 32, height: 32 },
  container: {
    alignItems: "center",
    flex: 1,
    height: Layout.window.height,
    justifyContent: "space-around",
  },
});

export interface CameraComponentRef {
  pausePreview: () => void;
  resumePreview: () => void;
}

interface Props {
  navigation: StackNavigationProps<"Camera">;
}

const Camera = (props: Props) => {
  const { navigation } = props;
  const cameraRef = useRef<CameraRef | null>(null);
  const [permission, setPermission] = useState<PermissionStatus>(
    PermissionStatus.UNDETERMINED
  );
  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await requestCameraPermission();
      setPermission(status);
    })();
  }, []);

  const pausePreview = () => {
    if (cameraRef.current) {
      cameraRef.current.pausePreview();
    }
  };

  const resumePreview = () => {
    if (cameraRef.current) {
      cameraRef.current.resumePreview();
    }
  };

  useFocusEffect(
    useCallback(() => {
      resumePreview();

      return () => pausePreview();
    }, [])
  );

  const handleCameraReady = () => {
    setCameraReady(true);
  };

  const handleShutterPressed = async () => {
    if (cameraRef.current && cameraReady) {
      const picture = await cameraRef.current.takePictureAsync({
        exif: true,
      });
      navigation.push("PhotoResult", { picture });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <CameraView
        cameraRef={cameraRef}
        onCameraReady={handleCameraReady}
        permission={permission}
        type={"back"}
      />
      <View style={styles.cameraBtnContainer}>
        <View style={styles.cameraBtnSpacing} />
        <Shutter onClick={handleShutterPressed} />
        <View style={styles.cameraBtnSpacing} />
      </View>
    </SafeAreaView>
  );
};

export default Camera;

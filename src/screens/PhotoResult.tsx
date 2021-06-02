import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Layout from "src/constants/Layout";
import type { PictureResult } from "src/modules/Camera";

const styles = StyleSheet.create({
  resultContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    height: Layout.window.height,
  },
  photo: {
    alignSelf: "center",
    backgroundColor: "grey",
    width: Layout.cameraWidth,
    height: Layout.cameraHeight,
    top: 8,
  },
});

interface Props {
  route: {
    params: {
      picture: PictureResult;
    };
  };
}

const PhotoResult = ({ route }: Props) => {
  return (
    <View style={styles.resultContainer}>
      <Image source={{ uri: route.params.picture.uri }} style={styles.photo} />
    </View>
  );
};

export default PhotoResult;

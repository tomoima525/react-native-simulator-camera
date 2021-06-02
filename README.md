# React Native Simulator Camera

https://user-images.githubusercontent.com/6277118/120438583-69772b80-c336-11eb-96d6-78f49d6fa903.mov

## What's this?

- This React Native project provides a way to mock Camera functionality on iOS Simulator
- No Native Code required. Everything runs on TypeScript.
- This project uses Expo for a easy environment setup purpose but technically you can use the code base to a bare React Native project.

## Why do you need this?

- Sometimes you want to simulate Camera on a simulator to mimick the actual production application. You want to capture a random photo rather than picking an image from Gallery.

## How to run this

- Clone the repo
- Run the command below

```
expo install & expo start --ios
```

## How does it work?

- There is a thin wrapper function component which mocks Camera functionality.
- If it's running on Simulator, download an image from placeholder generator sites.
- Randomly change the size of image to fetch in order to get different types of an image

```
const mockDLUrl = () => {
  const size = Math.ceil(Math.random() * 6) * 120;
  return `https://fillmurray.com/${size}/${size}`;
};
...

  const cameraRef = React.useRef<Camera | null>(null);
  const isEmulator = !DeviceInfo.isDevice;
  const { style, onCameraReady, type } = props;

  // if it's running on Simulator, immediately return that camera is ready
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

    // When running on Simulator, get random file from the internet
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

  // Expose the reference to Parent Component
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
```

## Disclaimer

- Placeholder generator sites might have an access limitation. Use it with your own risk.

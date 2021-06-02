import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TouchableHighlight } from "react-native-gesture-handler";
import Camera from "src/screens/Camera";
import PhotoResult from "src/screens/PhotoResult";
import type { StackNavigationProps } from "types";

const Stack = createStackNavigator();

interface HomeProps {
  navigation: StackNavigationProps<"Home">;
}
const HomeScreen = ({ navigation }: HomeProps) => {
  const openCamera = () => {
    navigation.navigate("Camera");
  };
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={openCamera}>
        <Text>Launch Camera</Text>
      </TouchableHighlight>
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Camera"
            component={Camera}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="PhotoResult" component={PhotoResult} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

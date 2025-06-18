import { Stack } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import "./globals.css";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
      {!isLoggedIn && !isFirstLaunch && <Stack.Screen name="login" />}
      {!isLoggedIn && isFirstLaunch && <Stack.Screen name="onboarding" />}
      {/* {isLoggedIn && <Stack.Screen name="(tabs)" />} */}
    </Stack>
  );
}

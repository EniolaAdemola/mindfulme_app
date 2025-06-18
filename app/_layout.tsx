import { ClerkProvider } from "@clerk/clerk-expo";
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
    <ClerkProvider>
      {/* <SafeAreaProvider>
        <SafeAreaView className="flex-1"> */}
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="sign-in"
            options={{
              headerShown: false,
            }}
          /> */}
      {/* </SafeAreaView>
      </SafeAreaProvider> */}
    </ClerkProvider>
  );
}

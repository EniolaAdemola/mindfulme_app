import { Stack } from "expo-router";
import React from "react";
import "./globals.css";

export default function RootLayout() {
  const isLoggedIn = false;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen name="(auth)" /> // Your onboarding & login stack
      )}
    </Stack>
  );
}

import React from "react";
import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function Onboarding() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-bold mb-6">Welcome to MindFulMe</Text>
      <Button title="Create Account" onPress={() => router.push("/signup")} />
      <Button title="Login" onPress={() => router.push("/login")} />
    </View>
  );
}

import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    // In a real app, you would call your authentication API here
    // For demo purposes, we're just setting a dummy token
    // await AsyncStorage.setItem("userToken", "dummy_token");
    router.replace("/(tabs)");
  };

  const goToSignup = () => {
    // router.push("/(auth)/signup");
  };

  return (
    <View className="flex-1 p-6 bg-white justify-center">
      <Text className="text-2xl font-bold mb-6">Login</Text>

      <TextInput
        className="border border-gray-300 p-3 rounded-lg mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        className="border border-gray-300 p-3 rounded-lg mb-6"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        className="bg-purple-600 p-4 rounded-lg"
        onPress={handleLogin}
      >
        <Text className="text-white text-center font-medium">Login</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-4" onPress={goToSignup}>
        <Text className="text-purple-600 text-center">
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

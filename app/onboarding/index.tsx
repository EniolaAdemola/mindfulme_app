import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Onboarding() {
  const router = useRouter();

  const features = [
    {
      title: "Mental Health Tracking",
      description: "Monitor your mood and mental wellbeing",
      icon: "📊",
    },
    {
      title: "Guided Meditation",
      description: "Reduces stress with mindfulness exercises",
      icon: "🧘‍♂️",
    },
    {
      title: "AI Mental Health Assistant",
      description: "Get personalized support and resources",
      icon: "🤖",
    },
  ];

  const completeOnboarding = async () => {
    // await AsyncStorage.setItem("hasSeenOnboarding", "true");
    // router.push("/(auth)/login");
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="items-center px-6 py-12">
        <Text className="text-3xl font-bold text-purple-600 mb-2">
          Welcome to MindfulMe
        </Text>
        <Text className="text-lg text-gray-600 mb-10">
          Your Personal Mental Wellness Companion
        </Text>

        {features.map((feature, index) => (
          <View key={index} className="bg-purple-50 rounded-xl p-6 mb-6 w-full">
            <Text className="text-4xl mb-3">{feature.icon}</Text>
            <Text className="text-xl font-bold text-gray-900 mb-1">
              {feature.title}
            </Text>
            <Text className="text-gray-600">{feature.description}</Text>
          </View>
        ))}

        <View className="flex-row space-x-4 mt-6">
          <TouchableOpacity
            className="bg-purple-600 px-8 py-3 rounded-full flex-1"
            onPress={completeOnboarding}
          >
            <Text className="text-white text-center font-medium">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

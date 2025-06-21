import { images } from "@/constants/images";
import { useUser } from "@/context/UserContext";
import React from "react";
import { Image, Text, View } from "react-native";

const AIGreetings = () => {
  const { user } = useUser();
  const displayName = user?.user_metadata?.display_name;

  return (
    <View className="px-2 py-2 bg-white rounded-xl shadow-sm">
      {/* Header with AI icon and greeting */}
      <Image source={images.aiImage} className="w-14 h-14 rounded-full p-2" />
      <View className="ml-3">
        <Text className="text-xl text-gray-900 font-semibold space-x-4">
          Hello {displayName?.split(" ")[0]}
        </Text>
        <Text className="text-black-700 mt-1">
          What would you like to know?
        </Text>
      </View>

      {/* Welcome message */}
      <View className="px-4 pt-2 rounded-lg">
        <Text className="leading-6 text-gray-500 ">
          MindfulMe provide you the most relevant support, please select a topic
          you'd like to discuss today.
        </Text>
      </View>
    </View>
  );
};

export default AIGreetings;

import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const categories = [
  {
    name: "Articles",
    icon: icons.articles,
    route: "/articles",
  },
  {
    name: "Reports",
    icon: icons.Reports,
    route: "/analytics",
  },
  {
    name: "Ai Assistant",
    icon: icons.AiChart,
    route: "/aiAssistant",
  },
  {
    name: "Journal",
    icon: icons.Journal,
    route: "/journal",
  },
];

const Categories = () => {
  const router = useRouter();

  return (
    <View className="px-5 py-5 bg-white rounded-xl">
      <Text className="text-lg font-bold mb-4">All Categories</Text>

      <View className="flex-row justify-between">
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            className="items-center"
            onPress={() => router.push(category.route as any)}
          >
            <View className="w-16 h-16 border border-gray-100 rounded-full items-center justify-center mb-2">
              <Image
                source={category.icon}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            </View>
            <Text className="text-sm">{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Categories;

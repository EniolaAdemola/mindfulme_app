import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const TodaysProgress = () => {
  const router = useRouter();

  return (
    <View className="px-5 mt-6">
      {/* Header */}
      <Text className="text-lg font-bold text-gray-900 mb-1">
        Today's Progress
      </Text>

      {/* Stats Grid */}
      <View className="flex-row justify-between bg-white rounded-xl p-5">
        {/* Mood Checks */}
        <View className="items-center">
          <Text className="text-2xl font-bold text-purple-600">1</Text>
          <Text className="text-xs text-gray-500 mt-1">Mood Checks</Text>
        </View>

        {/* Ratio (assuming this is your 1:3) */}
        <View className="items-center">
          <Text className="text-2xl font-bold text-blue-600">1:3</Text>
          <Text className="text-xs text-gray-500 mt-1">Completed</Text>
        </View>

        {/* Journal Entries */}
        <View className="items-center">
          <Text className="text-2xl font-bold text-green-600">0</Text>
          <Text className="text-xs text-gray-500 mt-1">Journal Entries</Text>
        </View>
      </View>

      {/* View Weekly Report Button */}
      <TouchableOpacity
        className="mt-3 self-end"
        onPress={() => router.push("/analytics")}
      >
        <Text className="text-purple-600 text-sm font-medium">
          View Weekly Report →
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodaysProgress;

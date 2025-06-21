import { getMoodCheckCountToday } from "@/app/lib/api";
import { supabase } from "@/app/lib/superbase";
import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TodaysProgress = () => {
  const router = useRouter();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCount() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const result = await getMoodCheckCountToday(user.id);
        if (!result.error) setCount(result.count);
      }
    }
    fetchCount();
  }, []);

  return (
    <View className="px-5 mt-6">
      {/* Header */}
      <Text className="text-lg font-bold text-gray-900 mb-1">
        Today's Progress
      </Text>

      {/* Stats Grid */}
      <View className="flex-row justify-between bg-white rounded-xl px-5 py-10">
        {/* Mood Checks */}
        <View className="items-center border border-gray-100 rounded-xl px-10 py-6">
          <View className="w-16 h-16 border border-gray-100 rounded-full items-center justify-center mb-2">
            <Text className="text-3xl">😁</Text>
          </View>
          <Text className="text-2xl font-bold text-purple-600">{count}</Text>
          <Text className="text-xs text-gray-500 mt-1">Mood Checks</Text>
        </View>

        {/* Journal Entries */}
        <View className="items-center border border-gray-100 rounded-xl px-10 py-6">
          <View className="w-16 h-16 border border-gray-100 rounded-full items-center justify-center mb-2">
            <Image
              source={icons.Journal}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </View>
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

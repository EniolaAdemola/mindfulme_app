import Chart from "@/components/Chart";
import OtherReports from "@/components/OtherReports";
import WeeklyInsight from "@/components/WeeklyInsight";
import React, { useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";

const analytics = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshKey((k) => k + 1); // Force re-render of
    setRefreshing(false);
  };

  return (
    <ScrollView
      key={refreshKey}
      className="bg-white flex-1"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <WeeklyInsight />

      <View className="px-4 py-3">
        <Text className="font-semibold text-xl">Mood Overview</Text>
        <Text className="text-sm text-gray-600">
          Average mood per day/week, mood trends, most frequent mood
        </Text>
      </View>
      {/* Chat component */}
      <Chart />
      {/* Other system report */}
      <OtherReports />
    </ScrollView>
  );
};

export default analytics;

import AIChatScreen from "@/components/AIChatScreen";
import React from "react";
import { ScrollView, View } from "react-native";

const aiAssistant = () => {
  return (
    <View className="flex-1 bg-purple-100">
      <ScrollView
        // showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        className="flex-1"
      >
        <AIChatScreen />
      </ScrollView>
    </View>
  );
};

export default aiAssistant;

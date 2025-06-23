import EntryScreen from "@/components/EntryScreen";
import InsightsScreen from "@/components/InsightsScreen";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function JournalTabs() {
  const [activeScreen, setActiveScreen] = useState<"entry" | "insights">(
    "entry"
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", marginBottom: 40 }}>
      {/* Custom Switch */}
      <View
        style={{
          flexDirection: "row",
          margin: 16,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: activeScreen === "entry" ? "#5F3DC4" : "#F3F4F6",
            paddingVertical: 12,
            alignItems: "center",
          }}
          onPress={() => setActiveScreen("entry")}
        >
          <Text
            style={{
              color: activeScreen === "entry" ? "#fff" : "#5F3DC4",
              fontWeight: "600",
            }}
          >
            Journal Entry
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor:
              activeScreen === "insights" ? "#5F3DC4" : "#F3F4F6",
            paddingVertical: 12,
            alignItems: "center",
          }}
          onPress={() => setActiveScreen("insights")}
        >
          <Text
            style={{
              color: activeScreen === "insights" ? "#fff" : "#5F3DC4",
              fontWeight: "600",
            }}
          >
            Insights
          </Text>
        </TouchableOpacity>
      </View>

      {/* Render the selected screen */}
      <View style={{ flex: 1 }}>
        {activeScreen === "entry" ? <EntryScreen /> : <InsightsScreen />}
      </View>
    </View>
  );
}

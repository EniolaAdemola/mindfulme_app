import { getUserMoodsForWeek } from "@/app/lib/api";
import { useUser } from "@/context/UserContext";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BarChart } from "react-native-svg-charts";

const moods = [
  { emoji: "😐", name: "Neutral" },
  { emoji: "😊", name: "Happy" },
  { emoji: "😢", name: "Sad" },
  { emoji: "😠", name: "Angry" },
  { emoji: "🤒", name: "Sick" },
  { emoji: "😫", name: "Stressed" },
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDay(dateStr: string) {
  return new Date(dateStr).getDay();
}

export default function Chart() {
  const { user } = useUser();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [weekMoods, setWeekMoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMoods() {
      if (!user) return;
      setLoading(true);
      const result = await getUserMoodsForWeek(user.id);
      setWeekMoods(result.data || []);
      setLoading(false);
    }
    fetchMoods();
  }, [user]);

  // Prepare data for chart
  const moodCounts = moods.map((mood) => {
    // If filtering by day, only count moods for that day
    const filtered =
      selectedDay !== null
        ? weekMoods.filter((m) => getDay(m.created_at) === selectedDay)
        : weekMoods;
    return filtered.filter((m) => m.user_mood === mood.name).length;
  });

  const total = moodCounts.reduce((a, b) => a + b, 0);
  const maxCount = Math.max(...moodCounts);
  const mostActiveIdx = moodCounts.findIndex((c) => c === maxCount && c > 0);
  const mostActiveMood = mostActiveIdx !== -1 ? moods[mostActiveIdx] : null;

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        margin: 16,
        elevation: 2,
      }}
    >
      {mostActiveMood && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: 12,
            marginBottom: 8,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 22, marginRight: 4 }}>
              {mostActiveMood.emoji}
            </Text>
            <Text style={{ color: "#53389E", fontWeight: "600", fontSize: 15 }}>
              {mostActiveMood.name}
            </Text>
          </View>
          <Text style={{ color: "#53389E", fontWeight: "bold", fontSize: 15 }}>
            {total > 0
              ? `${Math.round(
                  (moodCounts[mostActiveIdx] / total) * 100
                )}% on the ${mostActiveMood.name} side`
              : "0%"}
          </Text>
        </View>
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 12 }}
      >
        {daysOfWeek.map((day, idx) => (
          <TouchableOpacity
            key={day}
            onPress={() => setSelectedDay(idx === selectedDay ? null : idx)}
            style={{
              backgroundColor: selectedDay === idx ? "#53389E" : "#E9D5FF",
              borderRadius: 12,
              paddingVertical: 6,
              paddingHorizontal: 14,
              marginRight: 8,
            }}
          >
            <Text
              style={{
                color: selectedDay === idx ? "#fff" : "#53389E",
                fontWeight: "600",
              }}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => setSelectedDay(null)}
          style={{
            backgroundColor: selectedDay === null ? "#53389E" : "#E9D5FF",
            borderRadius: 12,
            paddingVertical: 6,
            paddingHorizontal: 14,
          }}
        >
          <Text
            style={{
              color: selectedDay === null ? "#fff" : "#53389E",
              fontWeight: "600",
            }}
          >
            All
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {loading ? (
        <Text
          style={{ textAlign: "center", color: "#888", marginVertical: 24 }}
        >
          Loading...
        </Text>
      ) : (
        <View>
          <BarChart
            style={{ height: 180, borderRadius: 12 }}
            data={moodCounts}
            svg={{ fill: "#7C3AED", rx: 8, ry: 8 }}
            spacingInner={0.4}
            gridMin={0}
            yAccessor={({ item }: any) => item}
            contentInset={{ top: 10, bottom: 10 }}
          />
          {/* <XAxis
            style={{ marginTop: 10 }}
            data={moodCounts}
            formatLabel={(_: any, idx: any) => moods[idx].emoji}
            contentInset={{ left: 20, right: 20 }}
            scale={scale.scaleBand}
          /> */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            {moods.map((mood) => (
              <View key={mood.name} style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 18 }}>{mood.emoji}</Text>
                <Text style={{ fontSize: 12, color: "#53389E" }}>
                  {mood.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

import {
  getAllUserJournals,
  getMoodCheckCount,
  getUserJournalCount,
} from "@/app/lib/api";
import { supabase } from "@/app/lib/superbase";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const OtherReports = () => {
  const [moodCount, setMoodCount] = useState<number | null>(null);
  const [journalCount, setJournalCount] = useState<number | null>(null);
  const [longestStreak, setLongestStreak] = useState<number>(0);

  useEffect(() => {
    async function fetchStats() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        // Mood count
        const moodResult = await getMoodCheckCount(user.id);
        if (!moodResult.error) setMoodCount(moodResult.count);

        // Journal count
        const journalCountResult = await getUserJournalCount(user.id);
        if (!journalCountResult.error)
          setJournalCount(journalCountResult.count);

        // Longest streak
        const journalsResult = await getAllUserJournals(user.id);
        if (journalsResult.data) {
          const dates = journalsResult.data.map((j: any) =>
            new Date(j.created_at).toDateString()
          );
          const uniqueDates = Array.from(new Set(dates)).sort(
            (a, b) => new Date(a).getTime() - new Date(b).getTime()
          );

          let maxStreak = 0;
          let currentStreak = 0;
          let prevDate: Date | null = null;

          uniqueDates.forEach((dateStr) => {
            const date = new Date(dateStr);
            if (
              prevDate &&
              (date.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24) ===
                1
            ) {
              currentStreak += 1;
            } else {
              currentStreak = 1;
            }
            if (currentStreak > maxStreak) maxStreak = currentStreak;
            prevDate = date;
          });

          setLongestStreak(maxStreak);
        }
      }
    }
    fetchStats();
  }, []);

  const stats = [
    {
      id: 1,
      icon: "happy-outline",
      label: "Total mood counts",
      value: moodCount ?? "- -",
    },
    {
      id: 2,
      icon: "book-outline",
      label: "Total Entries (Journal)",
      value: journalCount ?? "- -",
    },
    {
      id: 3,
      icon: "flame-outline",
      label: "Longest Streak Kept",
      value: longestStreak || "- -",
    },
  ];

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.row} key={item.id}>
      <View style={styles.left}>
        <Ionicons
          name={item.icon}
          size={20}
          color="#6B7280"
          style={{ marginRight: 12 }}
        />
        <Text style={styles.label}>{item.label}</Text>
      </View>
      <View style={styles.right}>
        <View style={styles.valueBox}>
          <Text style={styles.value}>{item.value}</Text>
        </View>
        {item.id !== 1 && (
          <Ionicons name="chevron-forward" size={18} color="#6B7280" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ padding: 16 }} className="mb-10">
      <Text
        style={{ fontWeight: "semibold", fontSize: 18, marginBottom: 12 }}
        className="flex-row items-center gap-4"
      >
        Other Reports
      </Text>
      <Text className="text-sm text-gray-600">
        showing data for the total numbers of entries, streaks, and articles
        available
      </Text>

      <View style={{ padding: 16 }}>
        {stats.map((item) => renderItem({ item }))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  label: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
    flexShrink: 1,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  valueBox: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginRight: 8,
  },
  value: {
    color: "#6D28D9",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default OtherReports;

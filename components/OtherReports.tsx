import { getMoodCheckCount } from "@/app/lib/api";
import { supabase } from "@/app/lib/superbase";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const OtherReports = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCount() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const result = await getMoodCheckCount(user.id);
        if (!result.error) setCount(result.count);
      }
    }
    fetchCount();
  }, []);

  const stats = [
    {
      id: 1,
      icon: "happy-outline",
      label: "Total mood counts",
      value: count || "- -", // Use the fetched count or default to 0
    },
    {
      id: 2,
      icon: "book-outline",
      label: "Total Entries (Journal)",
      value: "- -",
    },
    {
      id: 3,
      icon: "flame-outline",
      label: "Longest Streak Kept",
      value: "- -",
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
        showing data for the total numbers of entries, streaks,and articles
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

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function JournalScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for entries"
        />
        <TouchableOpacity style={styles.sortButton}>
          <Ionicons name="swap-vertical" size={20} color="black" />
          <Text style={styles.sortText}>Sort By</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.insightsRow}>
        <Text style={styles.insightsTitle}>Insights</Text>
        <Text style={styles.insightsSubtitle}>
          check out your overall journal insights
        </Text>
      </TouchableOpacity>

      <View style={styles.centerContent}>
        <Ionicons name="book-outline" size={48} color="#6C4EE3" />
        <Text style={styles.startTitle}>Start Journaling</Text>
        <Text style={styles.startSubtitle}>
          Start writing your thoughts and feelings{"\n"}
          to begin your journaling practice
        </Text>
      </View>

      <TouchableOpacity style={styles.fabButton}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 8,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
  },
  sortText: {
    marginLeft: 4,
    fontSize: 14,
  },
  insightsRow: {
    marginTop: 8,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  insightsSubtitle: {
    fontSize: 12,
    color: "#888",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  startTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 12,
  },
  startSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },
  fabButton: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#6C4EE3",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
});

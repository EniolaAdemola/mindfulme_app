import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function EntryScreen() {
  const [entry, setEntry] = useState("");

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Title Bar */}
      <View style={styles.header}>
        <Ionicons name="book-outline" size={16} color="#fff" />
        <Text style={styles.headerText}>New Entry</Text>
      </View>

      {/* Input Box */}
      <View style={styles.inputWrapper}>
        <TextInput
          multiline
          value={entry}
          onChangeText={setEntry}
          placeholder="Start writing"
          placeholderTextColor="#9CA3AF"
          style={styles.textInput}
        />
      </View>

      {/* Recommendations */}
      <View style={styles.recommendations}>
        <Text style={styles.sectionTitle}>Recommendations</Text>
        <Text style={styles.subText}>
          We’ve suggested few topics you can write about based on your mood
          recently
        </Text>

        {/* Recommendation 1 */}
        <View style={styles.recommendationBox}>
          <View style={styles.recommendationLabelWrapper}>
            <Text style={styles.recommendationLabel}>Depression</Text>
          </View>
          <Text style={styles.recommendationText}>
            This past week has been a really low moment for you based on your
            mood selection and interactions with Ai. You might want to write
            about this feeling
          </Text>
        </View>

        {/* Recommendation 2 */}
        <View
          style={[styles.recommendationBox, { backgroundColor: "#F0FFF4" }]}
        >
          <View
            style={[
              styles.recommendationLabelWrapper,
              { backgroundColor: "#D1FAE5" },
            ]}
          >
            <Text style={[styles.recommendationLabel, { color: "#10B981" }]}>
              Joyful
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    backgroundColor: "#5F3DC4",
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 16,
    marginBottom: 8,
  },
  headerText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
  inputWrapper: {
    borderColor: "#3B82F6",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    minHeight: 150,
    marginBottom: 24,
  },
  textInput: {
    fontSize: 16,
    color: "#111827",
    minHeight: 120,
    textAlignVertical: "top",
  },
  recommendations: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#111827",
  },
  subText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  recommendationBox: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  recommendationLabelWrapper: {
    backgroundColor: "#EEF2FF",
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
    borderRadius: 20,
    marginBottom: 6,
  },
  recommendationLabel: {
    fontSize: 12,
    color: "#6366F1",
    fontWeight: "600",
  },
  recommendationText: {
    color: "#4B5563",
    fontSize: 14,
  },
});

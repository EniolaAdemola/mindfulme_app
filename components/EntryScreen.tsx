import {
  getUserMoodsForWeek,
  getWeeklyRecommendations,
  submitUserEntry,
} from "@/app/lib/api";
import { supabase } from "@/app/lib/superbase";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EntryScreen() {
  const [entry, setEntry] = useState("");
  const [topic, setTopic] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [recommendations, setRecommendations] = useState<
    { label: string; text: string }[]
  >([]);
  const [loadingRecs, setLoadingRecs] = useState(true);

  React.useEffect(() => {
    async function fetchRecs() {
      setLoadingRecs(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setRecommendations([]);
        setLoadingRecs(false);
        return;
      }
      const moodsResult = await getUserMoodsForWeek(user.id);
      if (!moodsResult.data || moodsResult.data.length === 0) {
        setRecommendations([]);
        setLoadingRecs(false);
        return;
      }
      const displayName = user.user_metadata?.display_name || user.email;
      const recs = await getWeeklyRecommendations(
        moodsResult.data,
        displayName
      );
      setRecommendations(recs);
      setLoadingRecs(false);
    }
    fetchRecs();
  }, []);

  const handleSubmit = async () => {
    setSubmitting(true);
    // Get user info from supabase
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      Alert.alert("Error", "User not found.");
      setSubmitting(false);
      return;
    }
    const userName = user.user_metadata?.display_name || user.email;
    const result = await submitUserEntry({
      userId: user.id,
      userName,
      topic,
      note: entry,
    });
    setSubmitting(false);
    if (result.error) {
      console.log();
      console.error("Error submitting entry:", result.error);
      Alert.alert("Error", "Failed to submit entry.");
    } else {
      Alert.alert(
        "Success",
        "Entry submitted! check Insight tab to view all entries"
      );
      setEntry("");
      setTopic("");
    }
  };

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

      {/* Topic Input */}
      <View style={styles.inputWrapper}>
        <TextInput
          value={topic}
          onChangeText={setTopic}
          placeholder="Topic"
          placeholderTextColor="#9CA3AF"
          style={[styles.textInput, { marginBottom: 10, fontWeight: "600" }]}
        />
        <TextInput
          multiline
          value={entry}
          onChangeText={setEntry}
          placeholder="Start writing"
          placeholderTextColor="#9CA3AF"
          style={styles.textInput}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[
          styles.submitButton,
          !(topic && entry) || submitting ? { backgroundColor: "#E5E7EB" } : {},
        ]}
        onPress={handleSubmit}
        disabled={!(topic && entry) || submitting}
      >
        <Text
          style={{
            color: !(topic && entry) || submitting ? "#9CA3AF" : "#fff",
            fontWeight: "600",
          }}
        >
          {submitting ? "Submitting..." : "New Entry"}
        </Text>
      </TouchableOpacity>

      {/* Recommendations */}
      <View style={styles.recommendations}>
        <Text style={styles.sectionTitle}>Recommendations</Text>
        <Text style={styles.subText}>
          We’ve suggested a few topics you can write about based on your mood
          recently, Refresh for the latest recommendations.
        </Text>
        {loadingRecs ? (
          <Text style={{ color: "#888" }}>Loading recommendations...</Text>
        ) : recommendations.length === 0 ? (
          <Text style={{ color: "#888" }}>
            No recommendations available, please make sure you have done enough
            moodchecks for this week
          </Text>
        ) : (
          recommendations.map((rec, idx) => (
            <View
              key={rec.label + idx}
              style={[
                styles.recommendationBox,
                idx % 2 === 1 && { backgroundColor: "#F0FFF4" },
              ]}
            >
              <View
                style={[
                  styles.recommendationLabelWrapper,
                  idx % 2 === 1 && { backgroundColor: "#D1FAE5" },
                ]}
              >
                <Text
                  style={[
                    styles.recommendationLabel,
                    idx % 2 === 1 && { color: "#10B981" },
                  ]}
                >
                  {rec.label}
                </Text>
              </View>
              <Text style={styles.recommendationText}>{rec.text}</Text>
            </View>
          ))
        )}
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
    minHeight: 40,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#5F3DC4",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 24,
  },
  recommendations: {
    marginBottom: 40,
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

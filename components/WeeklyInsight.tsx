import { getUserMoodsForWeek } from "@/app/lib/api";
import { images } from "@/constants/images";
import { useUser } from "@/context/UserContext";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";

const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

// An Agent that provides weekly insights based on user mood data
async function getWeeklyInsightSummary(moods: any[], displayName: string) {
  const moodList = moods
    .map(
      (m) =>
        `Date: ${new Date(m.created_at).toLocaleDateString()}, Mood: ${
          m.user_mood
        }, Note: ${m.note || "None"}`
    )
    .join("\n");

  const prompt = `
  You are MindfulMe, an AI mental wellness assistant. Here is ${displayName}'s mood log for the past week:
  ${moodList}
  
  Please provide a concise, supportive summary of their week, highlighting any patterns, positive trends, or suggestions for improvement. Use a warm, empathetic tone and keep your response under 30 words.
  `;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful mental wellness assistant.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 300,
    }),
  });
  const data = await response.json();
  let aiText =
    data.choices?.[0]?.message?.content ||
    "No insight available, submit your moods regularly to get weekly insights ";
  // Limit to 40 words
  aiText = aiText.split(/\s+/).slice(0, 40).join(" ");
  return aiText;
}

const WeeklyInsight = () => {
  const { user } = useUser();
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInsight() {
      if (!user) return;
      const moodsResult = await getUserMoodsForWeek(user.id);
      if (!moodsResult.data || moodsResult.data.length === 0) {
        setSummary("No mood data for this week yet.");
        setLoading(false);
        return;
      }
      const displayName = user.user_metadata?.display_name || "the user";
      const aiSummary = await getWeeklyInsightSummary(
        moodsResult.data,
        displayName
      );
      setSummary(aiSummary);
      setLoading(false);
    }
    fetchInsight();
  }, [user]);

  return (
    <View style={{ padding: 16 }}>
      <Text
        style={{ fontWeight: "semibold", fontSize: 18, marginBottom: 12 }}
        className="flex-row items-center gap-4"
      >
        <Image source={images.WeeklyAnalysisImage} className="size-5" />
        Weekly Insight
      </Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text className="text-sm text-gray-600">{summary}</Text>
      )}
    </View>
  );
};

export default WeeklyInsight;

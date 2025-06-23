import { supabase } from "./superbase";

export async function submitMood(selectedMood: string, note: string) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return { error: userError || new Error("User not found.") };
  }

  const moodData = {
    user_id: user.id,
    user_name: user.user_metadata?.display_name || user.email,
    user_mood: selectedMood,
    note: note,
  };

  console.log("Submitting mood data:", moodData);

  const { data, error } = await supabase
    .from("MoodCheckTable")
    .insert([moodData])
    .select(); // <-- This returns the inserted row(s)

  if (error) {
    return { error };
  }
  return { success: true, data };
}

export async function getMoodCheckCount(userId: string) {
  const { count, error } = await supabase
    .from("MoodCheckTable")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) {
    return { error };
  }
  return { count };
}

export async function getMoodCheckCountToday(userId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today

  const { count, error } = await supabase
    .from("MoodCheckTable")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", today.toISOString());

  if (error) {
    return { error };
  }
  return { count };
}

export async function getUserMoodsForWeek(userId: string) {
  // Get the date 7 days ago in ISO format
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 6); // includes today, so 7 days total
  weekAgo.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("MoodCheckTable")
    .select("*")
    .eq("user_id", userId)
    .gte("created_at", weekAgo.toISOString())
    .order("created_at", { ascending: true });

  if (error) {
    return { error };
  }
  return { data };
}

export async function getAllUserMoods(userId: string) {
  const { data, error } = await supabase
    .from("MoodCheckTable")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    return { error };
  }
  return { data };
}

export async function submitUserEntry({
  userId,
  userName,
  topic,
  note,
}: {
  userId: string;
  userName: string;
  topic: string;
  note: string;
}) {
  const topicData = {
    user_id: userId,
    user_name: userName,
    topic,
    note,
  };

  const { data, error } = await supabase
    .from("UserJournalTable") // Change to your actual table name
    .insert([topicData])
    .select();

  if (error) {
    return { error };
  }
  return { success: true, data };
}

// An Agent that fetch weekly recommendations
export async function getWeeklyRecommendations(
  moods: any[],
  displayName: string
) {
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

Based on this, suggest 5 personalized writing recommendations for their journal. 
Return a JSON array of 5 objects, each with "label" and "text" fields. 
Each label should be a short topic (1-2 words), and text should be a supportive, specific suggestion (max 25 words).
Example: [{"label": "Gratitude", "text": "Reflect on moments you felt thankful this week."}, ...]
ONLY return the JSON array.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
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
      max_tokens: 400,
    }),
  });

  const data = await response.json();
  let content = data.choices?.[0]?.message?.content || "[]";
  try {
    // Try to parse the JSON array from the response
    const recommendations = JSON.parse(content);
    if (Array.isArray(recommendations)) {
      return recommendations;
    }
    return [];
  } catch {
    return [];
  }
}

export async function getAllUserJournals(userId: string) {
  const { data, error } = await supabase
    .from("UserJournalTable")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    return { error };
  }
  return { data };
}

export async function getUserJournalCount(userId: string) {
  const { count, error } = await supabase
    .from("UserJournalTable")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) {
    return { error };
  }
  return { count };
}

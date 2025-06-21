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

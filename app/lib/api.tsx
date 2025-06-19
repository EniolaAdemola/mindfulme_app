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

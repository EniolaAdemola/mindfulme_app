import { submitMood } from "@/app/lib/api";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const moods = [
  { emoji: "😐", name: "Neutral" },
  { emoji: "😊", name: "Happy" },
  { emoji: "😢", name: "Sad" },
  { emoji: "😠", name: "Angry" },
  { emoji: "🤒", name: "Sick" },
  { emoji: "😫", name: "Stressed" },
];

const MoodCheck = () => {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [note, setNote] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // write a code to set error and success to false after 5 seconds if not null
  React.useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const result = await submitMood(selectedMood, note);
    setLoading(false);

    if (result.error) {
      setError(result.error.message || "An error occurred");
    } else {
      setSuccess("Mood submitted successfully!");
      setSelectedMood("");
      setNote("");
      setShowNoteInput(false);
    }
  };

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView>
        <View className="px-5 py-6 bg-white rounded-xl">
          <Text className="text-lg font-bold mb-6">
            How are you feeling today?
          </Text>

          {/* Mood Selection */}
          <View className="flex-row flex-wrap justify-between mb-6">
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood.name}
                className={`w-16 h-16 rounded-full items-center justify-center mb-3 ${
                  selectedMood === mood.name
                    ? "bg-purple-100 border-2 border-primary"
                    : "bg-gray-100"
                }`}
                onPress={() => setSelectedMood(mood.name)}
              >
                <Text className="text-3xl">{mood.emoji}</Text>
                <Text className="text-[0.6rem] mt-1">{mood.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Optional Note */}
          {showNoteInput ? (
            <TextInput
              className="border border-gray-300 rounded-lg p-3 mb-4"
              placeholder="Add a note (optional)"
              multiline
              numberOfLines={3}
              value={note}
              onChangeText={setNote}
            />
          ) : (
            <TouchableOpacity
              className="flex-row items-center mb-4"
              onPress={() => setShowNoteInput(true)}
            >
              <Text className="text-primary mr-2">+</Text>
              <Text className="text-gray-500">Add a note (optional)</Text>
            </TouchableOpacity>
          )}

          {/* Submit Button */}
          <TouchableOpacity
            className={`py-3 rounded-lg items-center ${
              selectedMood ? "bg-primary" : "bg-gray-300"
            } ${!selectedMood ? "opacity-50" : ""}`}
            disabled={!selectedMood}
            onPress={handleSubmit}
          >
            <Text
              className={`font-medium ${
                selectedMood ? "text-white" : "text-gray-400"
              }`}
            >
              {loading ? "Submitting..." : "Submit Mood"}
            </Text>
          </TouchableOpacity>
          {success && (
            <Text className="text-green-600 text-center mt-2">{success}</Text>
          )}
          {error && (
            <Text className="text-red-600 text-center mt-2">{error}</Text>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MoodCheck;

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
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);

  const handleSubmit = () => {
    console.log("Mood selected:", selectedMood);
    console.log("Note:", note);
    // Reset after submission
    setSelectedMood(null);
    setNote("");
    setShowNoteInput(false);
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
                <Text className="text-xs mt-1">{mood.name}</Text>
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
            }`}
            disabled={!selectedMood}
            onPress={handleSubmit}
          >
            <Text className={`text-white font-medium`}>Save Mood</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MoodCheck;

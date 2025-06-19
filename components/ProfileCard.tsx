import { supabase } from "@/app/lib/superbase";
import { icons } from "@/constants/icons";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const ProfileCard = () => {
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        // If you stored the name in user_metadata.display_name
        setDisplayName(user.user_metadata?.display_name || "");
      }
    };
    fetchUser();
  }, []);

  const motivationalQuotes = {
    quotes: [
      "Today is a new opportunity.",
      "A stress-free life is a healthy life.",
      "Believe in yourself.",
      "Embrace the spectrum of your moods.",
      "Every feeling is a reminder of who you are.",
      "Your mood is your guide—trust it.",
      "Let your emotions inspire creativity.",
      "Balance your mind and soul.",
      "Stay strong.",
      "Make it happen.",
    ],
  };

  const getDailyMotivationalQuote = () => {
    const dayIndex = Math.floor(Date.now() / 86400000);
    const index = dayIndex % motivationalQuotes.quotes.length;
    return motivationalQuotes.quotes[index];
  };

  return (
    <View
      className="w-full flex-row justify-between items-start 
    "
    >
      {/* Text Section */}
      <View>
        <Text className="text-white text-xl font-bold">
          {getGreeting()}
          {displayName
            ? ` ${
                displayName.split(" ")[0].charAt(0).toUpperCase() +
                displayName.split(" ")[0].slice(1).toLowerCase()
              }`
            : ""}
        </Text>
        <Text className="text-white text-sm opacity-80">
          {getDailyMotivationalQuote()}
        </Text>
      </View>

      {/* Notification Icon */}
      <TouchableOpacity
        className="p-3 bg-white rounded-full" // Changed to solid white background
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2, // For Android
        }}
      >
        <Image
          source={icons.notification}
          style={{
            width: 20,
            height: 20,
            tintColor: "black", // Changed to black icon
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileCard;

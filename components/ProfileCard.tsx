import { getAIDailyQuote } from "@/app/lib/api";
import { icons } from "@/constants/icons";
import { useUser } from "@/context/UserContext";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const ProfileCard = () => {
  const { user } = useUser();
  const displayName = user?.user_metadata?.display_name || user?.email || "";
  const [quote, setQuote] = useState("Loading...");

  useEffect(() => {
    async function fetchQuote() {
      if (user) {
        const aiQuote = await getAIDailyQuote(user.id, displayName);
        setQuote(aiQuote || "Today is a new opportunity.");
      }
    }
    fetchQuote();
  }, [user]);

  return (
    <View
      className="w-full flex-row justify-between items-start 
    "
    >
      {/* Text Section */}
      <View>
        <Text className="text-white text-xl font-bold">
          {getGreeting()}
          {displayName ? ` ${displayName.split(" ")[0]}` : ""}
        </Text>
        <Text className="text-white text-sm opacity-80">{quote}</Text>
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

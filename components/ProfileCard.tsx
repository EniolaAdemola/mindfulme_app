import { icons } from "@/constants/icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const ProfileCard = () => {
  return (
    <View className="w-full flex-row justify-between items-start ">
      {/* Text Section */}
      <View>
        <Text className="text-white text-2xl font-bold">
          Good Morning Adekunle
        </Text>
        <Text className="text-white text-xl opacity-80">
          Today is a new opportunity
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

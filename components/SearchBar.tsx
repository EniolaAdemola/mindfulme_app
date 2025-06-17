import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

const SearchBar = () => {
  return (
    <View className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl flex-row items-center">
      <Image
        source={icons.search}
        style={{
          width: 16,
          height: 16,
          tintColor: "#000000",
          marginRight: 10,
        }}
        resizeMode="contain"
      />

      <TextInput
        style={{
          width: "85%",
          height: 40,
          fontSize: 16,
        }}
        placeholder="Search for anything"
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );
};

export default SearchBar;

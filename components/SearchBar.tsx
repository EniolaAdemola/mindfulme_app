import { icons } from "@/constants/icons";
import { useRouter } from "expo-router"; // or useNavigation from react-navigation
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const TAB_SUGGESTIONS = [
  { label: "Journal Entry", route: "/journal" },
  { label: "Insights", route: "/journal", tab: "insights" },
  { label: "Analytics", route: "/analytics" },
  { label: "AI Assistant", route: "/aiAssistant" },
  // Add more tabs as needed
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  // Filter suggestions based on query
  const filtered = TAB_SUGGESTIONS.filter((tab) =>
    tab.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (tab: (typeof TAB_SUGGESTIONS)[0]) => {
    setShowSuggestions(false);
    setQuery("");
    // If you want to pass tab info (like "insights"), you can use params or global state
    if (tab.tab) {
      // @ts-ignore
      router.push({ pathname: tab.route, params: { tab: tab.tab } });
    } else {
      router.push(tab.route as any);
    }
  };

  return (
    <View className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl">
      <View className="flex-row items-center">
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
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            setShowSuggestions(!!text);
          }}
        />
      </View>
      {showSuggestions && filtered.length > 0 && (
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 8,
            marginTop: 4,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          {filtered.map((tab) => (
            <TouchableOpacity
              key={tab.label}
              onPress={() => handleSelect(tab)}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderBottomWidth: 1,
                borderBottomColor: "#eee",
              }}
            >
              <Text style={{ fontSize: 16 }}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default SearchBar;

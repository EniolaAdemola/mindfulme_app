import Categories from "@/components/Categories";
import MoodCheck from "@/components/MoodCheck";
import ProfileCard from "@/components/ProfileCard";
import SearchBar from "@/components/SearchBar";
import TodaysProgress from "@/components/TodaysProgress";
import { UserProvider } from "@/context/UserContext";
import { useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, View } from "react-native";
import ArticleSection from "../articles/ArticleSection";

export default function Index() {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshKey((k) => k + 1); // Change key to force re-render
    setRefreshing(false);
  };

  return (
    <UserProvider>
      <View className="flex-1 bg-purple-100">
      {refreshing && (
          <ActivityIndicator size="large" color="#53389E" />
        )}
        <ScrollView
          key={refreshKey}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className="flex-1"
        >
          <View className="px-5 pt-20 pb-10  bg-[#53389E]">
            <ProfileCard />
          </View>

          <View className="px-4 mt-3 ">
            <SearchBar />
          </View>

          <View className="px-4 mt-2 ">
            <MoodCheck />
          </View>

          <View className="px-4 mt-2 ">
            <Categories />
          </View>

          <View className="px-4 mt-2 ">
            <TodaysProgress />
          </View>

          <View className="px-5 mt-6 mb-28">
            <ArticleSection />
          </View>

        </ScrollView>
      </View>
    </UserProvider>
  );
}

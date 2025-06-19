import Categories from "@/components/Categories";
import MoodCheck from "@/components/MoodCheck";
import ProfileCard from "@/components/ProfileCard";
import SearchBar from "@/components/SearchBar";
import TodaysProgress from "@/components/TodaysProgress";
import * as Updates from "expo-updates";
import { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import ArticleSection from "../articles/ArticleSection";

export default function Index() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await Updates.reloadAsync(); // This will reload the entire app
    setRefreshing(false);
  };

  return (
    <View className="flex-1 bg-purple-100">
      {/* Purple Header Background */}

      <ScrollView
        // showsVerticalScrollIndicator={false}
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

        <View className="px-5 mt-6 mb-24">
          <ArticleSection />
        </View>

        <View className="px-5 mt-6 mb-24">{/* <Onboarding /> */}</View>
      </ScrollView>
    </View>
  );
}

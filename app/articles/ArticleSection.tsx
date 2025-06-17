import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth * 0.65; // shows ~1.5 cards

const ArticleCard = ({ article, onPress }: any) => (
  <TouchableOpacity
    className="mr-4"
    style={{ width: cardWidth }}
    onPress={onPress}
  >
    <Image
      source={article.image}
      className="w-full h-44 rounded-xl mb-2"
      resizeMode="cover"
    />
    <Text
      className="text-base font-semibold text-gray-900 mb-1"
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {article.title}
    </Text>
    <Text
      className="text-sm text-gray-500"
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {article.date || "June 2025"}
    </Text>
    <Text className="text-sm text-purple-600 mt-1">Show Details →</Text>
  </TouchableOpacity>
);

export const articles = [
  {
    id: "1",
    title: "How to Build a Morning Routine That Supports Your Mental Health",
    excerpt: "Learn simple strategies...",
    content: "Your morning sets the tone...",
    image: images.Image1,
    date: "June 15, 2025",
  },
  {
    id: "2",
    title: "Feeling Overwhelmed?",
    excerpt: "Learn how to stay calm...",
    content: "When you're feeling overwhelmed...",
    image: images.Image2,
    date: "June 10, 2025",
  },
  {
    id: "3",
    title: "Sleep and Mental Health",
    excerpt: "Discover the sleep-emotion link...",
    content: "Sleep plays a crucial role...",
    image: images.Image3,
    date: "June 8, 2025",
  },
];

const ArticleSection = () => {
  const router = useRouter();

  return (
    <View className="px-5 mt-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-gray-900">Articles</Text>
        <TouchableOpacity onPress={() => router.push("/articles" as any)}>
          <Text className="text-purple-600 text-sm font-medium">
            See More →
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onPress={() => router.push(`/articles/${article.id}`)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ArticleSection;

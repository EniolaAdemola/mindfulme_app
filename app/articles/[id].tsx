import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { articles } from "./ArticleSection";

export default function ArticleDetail() {
  const { id } = useLocalSearchParams();
  const article = articles.find((a) => a.id === id);

  if (!article) return <Text>Article not found</Text>;

  return (
    <ScrollView className="flex-1 bg-white">
      <Image
        source={article.image}
        className="w-full h-64"
        resizeMode="cover"
      />

      <View className="p-6">
        <Text className="text-2xl font-bold text-gray-900 mb-3">
          {article.title}
        </Text>

        <Text className="text-gray-500 text-sm mb-4">
          Published on {article.date}
        </Text>

        <Text className="text-base text-gray-700 leading-6">
          {article.content}
        </Text>

        {/* Related Articles Section */}
        <View className="mt-8 border-t border-gray-100 pt-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            More Articles
          </Text>
          {/* Render related articles here */}
        </View>
      </View>
    </ScrollView>
  );
}

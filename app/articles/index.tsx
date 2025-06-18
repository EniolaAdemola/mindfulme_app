import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const articles = [
  {
    id: "1",
    title: "How to Build a Morning Routine That Supports Your Mental Health",
    excerpt:
      "Learn simple strategies to stay calm and present during moments of stress or anxiety.",
    content: "Your morning sets the tone for your entire day...",
    image: images.Image1,
    date: "June 15, 2025",
  },
  {
    id: "2",
    title: "Feeling Overwhelmed?",
    excerpt:
      "Learn simple strategies to stay calm and present during moments of stress or anxiety.",
    content: "When you're feeling overwhelmed...",
    image: images.Image2,
    date: "June 10, 2025",
  },
  {
    id: "3",
    title: "Sleep and Mental Health",
    excerpt:
      "Discover the deep connection between sleep quality and emotional well-being",
    content: "Sleep plays a crucial role in...",
    image: images.Image3,
    date: "June 8, 2025",
  },
  {
    id: "4",
    title: "The Power of Positive Affirmations",
    excerpt: "Yoga classes focus on flexibility, strength, and mental clarity",
    content: "Positive affirmations can help...",
    image: images.Image4, // Replace with actual image
    date: "June 5, 2025",
  },
  {
    id: "5",
    title: "Small Wins, Big Impact",
    excerpt:
      "Self-care doesn't have to be complicated. Learn how small actions create big changes",
    content: "Small wins can lead to...",
    image: images.Image5, // Replace with actual image
    date: "June 1, 2025",
  },
];

export default function AllArticles() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-gray-50 mt-20">
      <View className="px-5 pt-6 pb-8">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-purple-600">← Back</Text>
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900">Articles</Text>
          <View className="w-8" />
        </View>

        <View className="space-y-5">
          {articles.map((article) => (
            <TouchableOpacity
              key={article.id}
              onPress={() => router.push(`/articles/${article.id}`)}
              className="bg-white rounded-xl p-0 overflow-hidden shadow-sm"
              activeOpacity={0.9}
            >
              <Image
                source={article.image}
                className="w-full h-48"
                resizeMode="cover"
              />
              <View className="p-5">
                <Text
                  className="text-xl font-bold text-gray-900 mb-2"
                  numberOfLines={2}
                >
                  {article.title}
                </Text>
                <Text
                  className="text-gray-600 mb-3 leading-5"
                  numberOfLines={3}
                >
                  {article.excerpt}
                </Text>
                <View className="flex-row justify-between items-center">
                  <Text className="text-xs text-gray-400">{article.date}</Text>
                  <Text className="text-purple-600 text-sm font-medium">
                    Read more →
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

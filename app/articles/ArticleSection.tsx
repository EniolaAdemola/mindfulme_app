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
    excerpt:
      "Learn simple strategies to create a mindful, productive start to your day that prioritizes your well-being.",
    content: `Your morning sets the tone for the entire day. A mindful, consistent routine can reduce stress, improve focus, and enhance overall mental health. Start by waking up at a consistent time — your body thrives on routine. Next, avoid reaching for your phone first thing; instead, take a few deep breaths or try journaling for five minutes. Consider adding gentle stretches or a short walk to awaken your body. A nourishing breakfast, preferably with protein and whole grains, fuels your mind. Most importantly, be kind to yourself; even small changes can have a big impact over time. When you create space for intentionality in the morning, you build resilience against the stresses of daily life.`,
    image: images.Image1,
    date: "June 15, 2025",
  },
  {
    id: "2",
    title: "Feeling Overwhelmed? Practical Tools to Regain Calm",
    excerpt:
      "Learn how to stay calm and centered when life feels too heavy to handle.",
    content: `When you're feeling overwhelmed, it can feel like your thoughts are racing and your heart won’t slow down. But there are ways to ground yourself in the moment. Start by pausing and taking 5 deep, slow breaths — in through the nose, out through the mouth. This activates your parasympathetic nervous system and helps you feel calmer. Next, try the 5-4-3-2-1 grounding exercise: identify 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. If possible, step outside for a few minutes; nature has a proven calming effect on the brain. Finally, remind yourself that it's okay to feel overwhelmed — what matters is how gently you respond to yourself in those moments.`,
    image: images.Image2,
    date: "June 10, 2025",
  },
  {
    id: "3",
    title: "Sleep and Mental Health: Why Rest Is More Than Just Recovery",
    excerpt:
      "Discover how your sleep patterns directly impact your emotional well-being and what to do about it.",
    content: `Sleep plays a crucial role in regulating emotions, memory, and cognitive function. Poor sleep can worsen anxiety, depression, and irritability, creating a vicious cycle. To protect your mental health, aim for 7–9 hours of restful sleep each night. Create a wind-down routine that signals to your brain it's time to rest: dim the lights, reduce screen time at least 30 minutes before bed, and engage in a calming activity like reading or meditation. Keep your bedroom cool, dark, and quiet — your sleep environment matters more than you might think. If you struggle with falling asleep, try writing down worries before bed or practicing progressive muscle relaxation. Prioritizing sleep is one of the most effective steps you can take for emotional resilience.`,
    image: images.Image3,
    date: "June 8, 2025",
  },
  {
    id: "4",
    title: "Digital Detox: How Unplugging Can Improve Your Mental Health",
    excerpt:
      "Explore how reducing screen time can help you feel more present and less stressed.",
    content: `In today’s hyper-connected world, it's easy to feel drained by constant notifications, social media updates, and endless news. A digital detox — even for short periods — can give your mind space to rest and reset. Start small: designate phone-free zones like the dining table or bedroom. Try scheduling a one-hour block each day where you disconnect from devices entirely. Use that time for mindful activities: a walk, reading, or simply being still. Research shows that reducing screen time can lower anxiety and improve sleep quality. You'll likely notice an increase in focus and creativity too. Remember, the goal isn't to eliminate technology, but to create a healthier relationship with it.`,
    image: images.Image4,
    date: "June 5, 2025",
  },
  {
    id: "5",
    title: "The Power of Gratitude: A Simple Practice for Better Mental Health",
    excerpt:
      "Discover how daily gratitude can boost happiness, lower stress, and build emotional resilience.",
    content: `Gratitude is more than just saying thank you — it’s a mindset that helps shift focus from what’s lacking to what’s good in your life. Studies show that people who practice gratitude regularly experience greater happiness, stronger relationships, and reduced symptoms of depression. To start, try writing down three things you’re thankful for each evening. These can be small moments — a kind word, a sunny day, a delicious meal. Over time, you may find yourself noticing more of these moments as they happen. For deeper impact, share your appreciation with others: a thank-you note, a kind message, or a simple acknowledgment can strengthen connections and spread positivity. Gratitude is a small habit with the potential for big emotional rewards.`,
    image: images.Image5,
    date: "June 2, 2025",
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

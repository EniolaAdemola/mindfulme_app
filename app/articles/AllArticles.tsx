// app/articles/index.tsx
import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { articles } from "./ArticleSection";

const ArticleListItem = ({ article, onPress }: any) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <Image source={article.image} style={styles.image} resizeMode="cover" />
    <View style={styles.textContainer}>
      <Text numberOfLines={1} style={styles.title}>
        {article.title}
      </Text>
      <Text numberOfLines={1} style={styles.date}>
        {article.date || "June 2025"}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function AllArticles() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.header}>All Articles</Text>

      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ArticleListItem
            article={item}
            onPress={() => router.push(`/articles/${item.id}`)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#111827",
  },
  date: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
});

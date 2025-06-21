import { getSystemPrompt } from "@/ai/prompt";
import AIGreetings from "@/components/AIGreetings";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useUser } from "@/context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function TopicGrid({
  onTopicPress,
}: {
  onTopicPress: (text: string) => void;
}) {
  const topics = [
    {
      id: 1,
      title: "Anxiety",
      description: "Feeling worried, nervous, or uneasy?",
      borderColor: "#3B82F6", // blue
      bgColor: "#EFF6FF",
    },
    {
      id: 2,
      title: "Depression",
      description: "Persistent feeling of sadness & loss of interest?",
      borderColor: "#10B981", // green
      bgColor: "#ECFDF5",
    },
    {
      id: 3,
      title: "Relationship",
      description: "Feeling worried, nervous, or uneasy?",
      borderColor: "#F97316", // orange
      bgColor: "#FFF7ED",
    },
    {
      id: 4,
      title: "Worklife Balance",
      description: "Persistent feeling of sadness & loss of interest?",
      borderColor: "#8B5CF6", // purple
      bgColor: "#F5F3FF",
    },
  ];
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => onTopicPress(`${item.title}: ${item.description}`)}
      style={[
        styles.card,
        {
          borderColor: item.borderColor,
          backgroundColor: item.bgColor,
        },
      ]}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={topics}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

export default function MyScreen() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ sender: "user" | "ai"; text: string }[]>(
    []
  );
  const { user } = useUser();
  const displayName = user?.user_metadata?.display_name;
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);

  async function sendToAI(question: string) {
    const systemPrompt = getSystemPrompt(displayName || "User");

    const lastMessages = chat.slice(-10);

    const openAIMessages = [
      { role: "system", content: systemPrompt },
      ...lastMessages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })),
      { role: "user", content: message }, // the new user message
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: openAIMessages,
      }),
    });
    const data = await response.json();
    return (
      data.choices?.[0]?.message?.content || "Sorry, I couldn't answer that."
    );
  }

  const handleSend = async () => {
    if (!message.trim()) return;
    const userMsg = message;
    setChat((prev) => [...prev, { sender: "user", text: userMsg }]);
    setMessage("");
    setLoading(true);

    try {
      const aiReply = await sendToAI(userMsg);
      setChat((prev) => [...prev, { sender: "ai", text: aiReply }]);
    } catch (e) {
      setChat((prev) => [
        ...prev,
        { sender: "ai", text: "There was an error getting a response." },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {chat.length === 0 && <AIGreetings />}
      {chat.length === 0 && <TopicGrid onTopicPress={setMessage} />}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.scrollContent}
        onContentSizeChange={() =>
          scrollRef.current?.scrollToEnd({ animated: true })
        }
      >
        {chat.map((msg, idx) => (
          <View
            key={idx}
            style={{
              flexDirection: msg.sender === "user" ? "row-reverse" : "row",
              alignItems: "flex-start",
              marginVertical: 8,
              paddingHorizontal: 8,
            }}
          >
            <Image
              source={msg.sender === "user" ? icons.person : images.aiImage}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                marginHorizontal: 8,
                backgroundColor: "rgba(247, 247, 248, 3)",
              }}
            />
            {/* Message bubble */}
            <View
              style={{
                backgroundColor:
                  msg.sender === "user" ? "rgba(247, 247, 248, 1)" : "#000",
                padding: 12,
                maxWidth: "70%",
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                borderTopLeftRadius: msg.sender === "user" ? 16 : 0,
                borderTopRightRadius: msg.sender === "user" ? 0 : 16,
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
              }}
            >
              <Text
                style={{
                  color: msg.sender === "user" ? "#000" : "#fff",
                  fontSize: 16,
                }}
              >
                {msg.text}
              </Text>
            </View>
          </View>
        ))}
        {loading && (
          <Text style={{ color: "#aaa", alignSelf: "flex-start", margin: 8 }}>
            AI is typing...
          </Text>
        )}
      </ScrollView>
      {/* Input Box Fixed at Bottom */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <View
          style={[styles.inputContainer, { paddingBottom: insets.bottom + 20 }]}
        >
          <TextInput
            style={[styles.input, { maxHeight: 120, textAlignVertical: "top" }]}
            placeholder="Ask me anything..."
            value={message}
            onChangeText={setMessage}
            editable={!loading}
            multiline={true}
          />

          <TouchableOpacity style={styles.iconWrapper}>
            <Ionicons name="mic-outline" size={20} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSend}
            disabled={!message.trim() || loading}
          >
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 100, // give space so scroll doesn't hide behind input
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 50,
    backgroundColor: "rgba(247, 247, 248, 0.5)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  iconWrapper: {
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  sendButton: {
    backgroundColor: "#5F3DC4", // your purple
    padding: 10,
    borderRadius: 20,
  },

  card: {
    flex: 1,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
  },
});

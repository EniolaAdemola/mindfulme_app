import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AIChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello There!\n\nHow can I help you?",
      sender: "ai",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const router = useRouter();

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message
    const newUserMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputText("");

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponses = [
        "I'm really sorry you're feeling this way. You're not alone, and it's important to know that how you're feeling is valid.",
        "Would you like to talk more about what's troubling you?",
        "Have you considered speaking with a professional about how you're feeling?",
        "Remember that it's okay to not be okay sometimes. Would you like some resources to help?",
      ];

      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const newAiMessage = {
        id: Date.now().toString() + 1,
        text: randomResponse,
        sender: "ai",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, newAiMessage]);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={icons.arrowLeft}
            className="w-6 h-6 mr-2"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text className="text-xl font-bold">AI Mental Assistant</Text>
      </View>

      {/* Chat Messages */}
      <ScrollView
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 20 }}
        ref={(ref) => ref?.scrollToEnd({ animated: true })}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            className={`mb-4 ${
              message.sender === "ai" ? "items-start" : "items-end"
            }`}
          >
            <View
              className={`max-w-[80%] rounded-lg p-4 ${
                message.sender === "ai"
                  ? "bg-purple-100 rounded-tl-none"
                  : "bg-purple-500 rounded-tr-none"
              }`}
            >
              <Text
                className={`text-base ${
                  message.sender === "ai" ? "text-gray-800" : "text-white"
                }`}
              >
                {message.text}
              </Text>
              <Text
                className={`text-xs mt-1 ${
                  message.sender === "ai" ? "text-gray-500" : "text-purple-200"
                }`}
              >
                {message.time}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input Area */}
      <View className="p-4 border-t border-gray-200 bg-white">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4">
          <TextInput
            className="flex-1 py-3 text-gray-800"
            placeholder="Ask me anything..."
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity
            className="ml-2 p-2"
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Image
              source={icons.message}
              className="w-6 h-6"
              resizeMode="contain"
              tintColor={inputText.trim() ? "#7C3AED" : "#9CA3AF"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AIChatScreen;

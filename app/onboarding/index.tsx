import { images } from "@/constants/images";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const onboardingData = [
  {
    id: 1,
    image: images.Image6,
    title: "Welcome to MindfulME",
    description: "Your Personal Mental Wellness Companion",
  },
  {
    id: 2,
    image: images.Image3,
    title: "Mental Health Tracking",
    description: "Monitor your mood patterns and mental wellbeing",
  },
  {
    id: 3,
    image: images.Image5,
    title: "Guided Meditation",
    description: "Reduce stress with mindfulness exercises",
  },
  {
    id: 4,
    image: images.Image1,
    title: "AI Mental Health Assistant",
    description: "Get personalized support and resources",
  },
];

const { width, height } = Dimensions.get("window");

export default function Onboarding() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slide);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        {onboardingData.map((item) => (
          <View key={item.id} style={{ width, height, position: "relative" }}>
            <Image
              source={item.image}
              style={[
                StyleSheet.absoluteFillObject,
                { width: "100%", height: "100%" },
              ]}
              resizeMode="cover"
            />
            <View
              style={[
                StyleSheet.absoluteFillObject,
                { backgroundColor: "rgba(0,0,0,0.4)" },
              ]}
            />

            {/* Content */}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 250,
                paddingHorizontal: 32,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 25,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: 12,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  textAlign: "center",
                  marginBottom: 24,
                }}
              >
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* ======== PAGINATION SECTION ======== */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          position: "absolute",
          bottom: 260, // Positioned above the buttons
          width: "100%",
        }}
      >
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={{
              width: index === activeIndex ? 15 : 7, // Active indicator is wider
              height: 7,
              borderRadius: 5,
              marginHorizontal: 4,
              backgroundColor:
                index === activeIndex ? "#53389E" : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </View>
      {/* ======== END PAGINATION SECTION ======== */}

      {/* Action buttons - positioned on top of images */}
      <View
        style={{
          position: "absolute",
          bottom: 60,
          width: "100%",
          paddingHorizontal: 24,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#53389E",
            paddingVertical: 16,
            borderRadius: 10,
            marginBottom: 12,
          }}
          onPress={() => router.replace("/sign-in")}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 16,
          }}
          onPress={() => router.replace("/sign-up")}
        >
          <Text
            style={{
              color: "#ffff",
              textAlign: "center",
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Create an Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

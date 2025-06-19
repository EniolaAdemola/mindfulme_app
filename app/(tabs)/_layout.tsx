import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

interface TabIconProps {
  focused: boolean;
  icon: any;
  title: string;
  isCenter?: boolean;
}

const ACTIVE = "#53389E";
const INACTIVE = "#9ca3af";

const TabIcon = ({ focused, icon, title }: TabIconProps) => {
  const textColor = focused ? "text-[#53389E]" : "text-gray-400";
  const textWeight = focused ? "font-bold" : "font-normal";

  return (
    <View className="justify-center items-center w-20 flex-1 mt-2">
      <View
        style={{
          backgroundColor: focused ? ACTIVE : "transparent",
          borderRadius: 25, // fully rounded
          padding: 5,
          marginTop: 8,
        }}
      >
        <Image
          source={icon}
          style={{
            width: 23,
            height: 23,
            tintColor: focused ? "#fff" : INACTIVE,
          }}
          resizeMode="contain"
        />
      </View>
      <Text className={`text-xs ${textColor} ${textWeight}`}>{title}</Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#ffff",
          height: 80,
          borderTopLeftRadius: 20,
          position: "absolute",
          borderTopRightRadius: 20,
          paddingBottom: 5,
          borderTopWidth: 0,
          bottom: 0,
          elevation: 5,
          paddingHorizontal: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.Analytics}
              title="Analytics"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="aiAssistant"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.AiChart}
              title="AI Assistant"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.Journal} title="Journal" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}

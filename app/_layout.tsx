import { UserProvider } from "@/context/UserContext";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import "./globals.css";
import { supabase } from "./lib/superbase";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.replace("/(tabs)");
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  return (
    <UserProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </UserProvider>
    // {/* <SafeAreaProvider>
    //   <SafeAreaView className="flex-1"> */}
    // {/* <Stack.Screen
    //       name="(tabs)"
    //       options={{
    //         headerShown: false,
    //       }}
    //     />
    //     <Stack.Screen
    //       name="sign-in"
    //       options={{
    //         headerShown: false,
    //       }}
    //     /> */}
    // {/* </SafeAreaView>
    // </SafeAreaProvider> */}
  );
}

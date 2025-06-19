import { Session } from "@supabase/supabase-js";
import { Redirect } from "expo-router";
import * as Updates from "expo-updates";
import { useEffect, useState } from "react";
import { View } from "react-native";
import "react-native-url-polyfill/auto";
import { supabase } from "./lib/superbase";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await Updates.reloadAsync(); // This will reload the entire app
    setRefreshing(false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View>
      {/* <Auth /> */}
      {session && session.user && <Redirect href="/(tabs)" />}
      <Redirect href="/onboarding" />
    </View>
  );
}

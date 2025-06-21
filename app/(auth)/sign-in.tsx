import { images } from "@/constants/images";
import { useUser } from "@/context/UserContext";
import Checkbox from 'expo-checkbox';
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { supabase } from "../lib/superbase";

export default function SignIn() {
  const { setUser } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        Alert.alert(error.message);
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        router.replace("/(tabs)"); // or router.replace("/(tabs)") or your home screen
      }
    } finally {
      setLoading(false);
    }
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Image 
        source={images.backgroundBlur} 
        style={styles.background} 
        resizeMode="cover"
      />
      <Image 
        source={images.backgroundBlur} 
        style={styles.background2} 
        resizeMode="cover"
      />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Logo */}
          <View style={{ alignItems: "center" }}>
            <Link href="/">
              <Image 
                source={images.logo} 
                style={styles.logo} 
                resizeMode="contain"
              />
            </Link>
          </View>
         <Text className="font-bold text-center text-2xl mt-3 mb-10">MindFulMe </Text>

          
          <Text style={styles.title}>Login to Account</Text>
          <Text style={styles.subtitle}>Please provide your details</Text>
          
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="rgba(12, 17, 29, 0.4)"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          
          {/* Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="rgba(12, 17, 29, 0.4)"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          
          {/* Remember Me & Forgot Password */}
          <View style={styles.row}>
            <View style={styles.rememberContainer}>
              <Checkbox
                value={rememberMe}
                onValueChange={setRememberMe}
                color={rememberMe ? "#53389E" : undefined}
                style={styles.checkbox}
              />
              <Text style={styles.rememberText}>Remember me</Text>
            </View>
            
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          
          {/* Login Button */}
          <TouchableOpacity
  style={[
    styles.loginButton,
    (!email || !password) ? styles.loginButtonDisabled : styles.loginButtonActive,
  ]}
  disabled={!email || !password}
  onPress={signInWithEmail}
>
            <Text style={styles.buttonText}>
              {loading ? "Processing..." : "Login"}
            </Text>
          </TouchableOpacity>
          
          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>You don't have an account?</Text>
            <Link href="/sign-up" asChild>
              <TouchableOpacity>
                <Text style={styles.signupLink}> Sign up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "80%",
    marginTop: 400, 
  },
  background2: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "80%",
    marginTop: 600, 
    transform: [{ rotate: "90deg" }],
    marginLeft: -200,
  },
  scrollContainer: {
    flexGrow: 1,
    marginTop: 80,
    // justifyContent: "center",
  },
  content: {
    padding: 15,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  logo: {
    width: 180,
    height: 60,
    alignSelf: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    color: "#151312",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "left",
    color: "#667085",
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#344054",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#F7F7F8",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    marginRight: 8,
  },
  rememberText: {
    fontSize: 14,
    color: "#344054",
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: "500",
    color: "#53389E",
  },
  loginButton: {
    backgroundColor: "#53389E",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonActive: {
    backgroundColor: "rgba(83, 56, 158, 1)", // Active purple
  },
  loginButtonDisabled: {
    backgroundColor: "rgba(83, 56, 158, 0.3)", // Light purple
  },
  signupText: {
    fontSize: 14,
    color: "#667085",
  },
  signupLink: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#53389E",
  },
});
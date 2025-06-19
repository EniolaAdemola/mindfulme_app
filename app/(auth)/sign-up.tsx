import { images } from "@/constants/images";
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

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const isSignUpDisabled =
  !fullName ||
  !email ||
  !password ||
  !confirmPassword ||
  password !== confirmPassword;

    async function signUpWithEmail() {
      setLoading(true);
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: fullName, // or any custom field
            },
          },
        });
        if (error) {
          Alert.alert(error.message);
        } else if (!data.session) {
          Alert.alert("Please check your inbox for email verification!");
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
        <View style={styles.content} >
           <View style={{ alignItems: "center" }}>
          
           <Link href="/">
              <Image 
                source={images.logo} 
                style={styles.logo} 
                resizeMode="contain"
              />
            </Link>
            </View>
           <Text className="font-bold text-center text-2xl mt-3 mb-10">MindFulMe</Text>
            
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.subtitle}>Please provide your details</Text>
          
          {/* Name Fields */}
          <View style={styles.nameContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <TextInput
                autoCapitalize="words"
                style={styles.input}
                placeholder="Full Nnme"
                placeholderTextColor="rgba(12, 17, 29, 0.4)"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          </View>
          
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
              placeholder="Create a password"
              placeholderTextColor="rgba(12, 17, 29, 0.4)"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          
          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="rgba(12, 17, 29, 0.4)"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          
          {/* Terms Agreement */}
          <View style={styles.termsContainer}>
            <Checkbox
              value={termsAccepted}
              onValueChange={setTermsAccepted}
              color={termsAccepted ? "#53389E" : undefined}
              style={styles.checkbox}
            />
            <Text style={styles.termsText}>
              I agree to the Terms of Service and Privacy Policy
            </Text>
          </View>
          
          {/* Sign Up Button */}
          <TouchableOpacity 
            onPress={signUpWithEmail}
            style={[
              styles.signUpButton,
              isSignUpDisabled ? styles.buttonDisabled : styles.buttonActive,
            ]}
            disabled={loading || isSignUpDisabled}
          >
            <Text style={styles.buttonText}>
              {loading ? "Creating Account..." : "Sign up"}
            </Text>
          </TouchableOpacity>
          
          {/* Sign In Link */}
          <View style={styles.signinContainer}>
            <Text style={styles.signinText}>Already have an account?</Text>
            <Link href="/sign-in" asChild>
              <TouchableOpacity>
                <Text style={styles.signinLink}> Login</Text>
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
  },
  content: {
    padding: 5,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  logo: {
    width: 180,
    height: 60,
    alignSelf: "center",
    marginBottom: 24,
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
  nameContainer: {
    flexDirection: "row",
  },
  inputContainer: {
    marginBottom: 8,
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
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "rgba(231, 232, 234, 0.25)",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    marginRight: 8,
    marginTop: 4,
  },
  termsText: {
    fontSize: 14,
    color: "#344054",
    flex: 1,
  },
  signUpButton: {
    backgroundColor: "#53389E",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  disabledButton: {
    backgroundColor: "#E4E7EC",
  },
  buttonActive: {
    backgroundColor: "rgba(83, 56, 158, 1)", // Active purple
  },
  buttonDisabled: {
    backgroundColor: "rgba(83, 56, 158, 0.3)", // Light purple
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  signinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signinText: {
    fontSize: 14,
    color: "#667085",
  },
  signinLink: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#53389E",
    zIndex: 1,
  },
  resendCode: {
    fontSize: 14,
    fontWeight: "500",
    color: "#53389E",
    textAlign: "center",
    marginTop: 16,
  },
});
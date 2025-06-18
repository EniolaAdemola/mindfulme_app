import { images } from "@/constants/images";
import { useSignUp } from "@clerk/clerk-expo";
import Checkbox from 'expo-checkbox';
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
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

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setIsLoading(true);

    // Simple validation
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      setIsLoading(false);
      return;
    }

    try {
      await signUp.create({
        // firstName,
        // lastName,
        emailAddress,
        password,
      });

      // Send verification email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      console.error(JSON.stringify(err, null, 2));
      alert(`${errorMessage ? errorMessage : "Sign up failed. Please check your information and try again."}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle verification
  const onVerifyPress = async () => {
    if (!isLoaded) return;
    setIsLoading(true);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });
      console.log("SignUp Attempt:", JSON.stringify(signUpAttempt, null, 2));
      
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/sign-in");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      alert("Verification failed. Please check the code and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (pendingVerification) {
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
        
        <View style={[styles.content, { maxWidth: 400 }]}>
          <Image 
            source={images.logo} 
            style={styles.logo} 
            resizeMode="contain"
          />
          
          
          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.subtitle}>
            We've sent a verification code to {emailAddress}
          </Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Verification Code</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              placeholder="Enter your code"
              placeholderTextColor="#A8B5DB"
              value={code}
              onChangeText={setCode}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.signUpButton}
            onPress={onVerifyPress}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Verifying..." : "Verify Email"}
            </Text>
          </TouchableOpacity>
          
          <Link href="/sign-in" asChild>
              <TouchableOpacity>
                <Text style={styles.signinLink}> Login</Text>
              </TouchableOpacity>
            </Link>

          <TouchableOpacity onPress={() => setPendingVerification(false)}>
            <Text style={styles.resendCode}>Didn't receive a code? Resend</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
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
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Image 
            source={images.logo} 
            style={styles.logo} 
            resizeMode="contain"
          />
          
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.subtitle}>Please provide your details</Text>
          
          {/* Name Fields */}
          <View style={styles.nameContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                autoCapitalize="words"
                style={styles.input}
                placeholder="First name"
                placeholderTextColor="#A8B5DB"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            
            <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                autoCapitalize="words"
                style={styles.input}
                placeholder="Last name"
                placeholderTextColor="#A8B5DB"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>
          
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#A8B5DB"
              value={emailAddress}
              onChangeText={setEmailAddress}
            />
          </View>
          
          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Create a password"
              placeholderTextColor="#A8B5DB"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          
          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="#A8B5DB"
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
            style={[styles.signUpButton, !termsAccepted && styles.disabledButton]}
            onPress={onSignUpPress}
            disabled={isLoading || !termsAccepted}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Creating Account..." : "Sign up"}
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
    marginTop: 20
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    padding: 24,
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  logo: {
    width: 120,
    height: 40,
    alignSelf: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#151312",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#667085",
    marginBottom: 32,
  },
  nameContainer: {
    flexDirection: "row",
    marginBottom: 20,
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
    backgroundColor: "#fff",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
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
  },
  resendCode: {
    fontSize: 14,
    fontWeight: "500",
    color: "#53389E",
    textAlign: "center",
    marginTop: 16,
  },
});
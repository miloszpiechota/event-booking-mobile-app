import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import { fetchUserData } from "../database/FetchUserData";
import { UserContext } from "../UserContext";
import { API_BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode } from "base-64";
global.atob = decode;

// import jwt_decode from "react-native-jwt-decode";

// console.log("jwt_decode:", jwt_decode);
const decodeJWT = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};


const LoginScreen = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      console.log("API_BASE_URL:", API_BASE_URL);
  
      const url = `${API_BASE_URL}/api/users/login`;
      console.log("Request URL:", url);
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      console.log("Response Status:", response.status);
  
      const rawResponse = await response.text();
      console.log("Raw Response:", rawResponse);
  
      if (!response.ok) {
        console.error("HTTP Error:", response.status);
        Alert.alert("Server Error", `HTTP Error: ${response.status}`);
        return;
      }
  
      let data;
      try {
        data = JSON.parse(rawResponse);
      } catch (error) {
        console.error("JSON Parse Error:", error);
        Alert.alert("Server Error", "Invalid server response format.");
        return;
      }
  
      console.log("Parsed Response:", data);
  
      if (data.success) {
        const token = data.token;
        console.log("Login Successful. Token:", token);
  
        // Save token to AsyncStorage
        await AsyncStorage.setItem("userToken", token);
  
        // Decode the JWT token
        const decodedToken = decodeJWT(token);
        console.log("Decoded Token:", decodedToken);
  
        const userType = decodedToken.iduser_type;
  
        // Fetch additional user data if needed
        const userData = await fetchUserData(token);
  
        // Set user data in UserContext
        setUser({
          userId: userData.iduser,
          userName: userData.name,
          userEmail: userData.email,
          userType: userType,
          token: token,
        });
  
        // Navigate to the home screen
        navigation.navigate("HomeScreen");
      } else {
        Alert.alert("Login Failed", data.msg || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Login Failed", "An error occurred. Please try again.");
    }
  };
  
  
  
  

  const handleSignup = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>User Login</Text>

      {/* form  */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name={"mail-outline"} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor={colors.secondary}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail} // Update state on change
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"lock"} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntry}
            value={password}
            onChangeText={setPassword} // Update state on change
          />
          <TouchableOpacity
            onPress={() => {
              setSecureEntry((prev) => !prev);
            }}
          >
            <SimpleLineIcons name={"eye"} size={20} color={colors.secondary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButtonWrapper}
          onPress={handleLogin}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const colors = {
  primary: "#011C40", // Main color
  secondary: "#7f8c8d", // Secondary color
  white: "#ffffff", // White
  gray: "#fafdfb", // Gray
  black: "#C4DFE6", // Black
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  headingText: {
    fontSize: 32,
    color: colors.primary,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  forgotPasswordText: {
    textAlign: "right",
    color: colors.primary,
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginTop: 20,
  },
  loginText: {
    color: colors.white,
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: colors.primary,
  },
  signupText: {
    color: colors.primary,
  },
});

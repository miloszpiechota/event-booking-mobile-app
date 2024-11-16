import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

console.log("Device width:", width);
console.log("Device height:", height);

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("LoginScreen");
  };

  const handleSignup = () => {
    navigation.navigate("SignUpScreen");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/pl.jpg")} style={styles.bannerImage} />
      <Text style={styles.title}>Event Booking App</Text>
      <Text style={styles.subTitle}>
        Event Booking App to idealne narzędzie dla wszystkich, którzy chcą być na bieżąco z lokalnymi wydarzeniami.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.loginButtonWrapper, { backgroundColor: '#011C40' }]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginButtonWrapper, { backgroundColor: '#fafdfb' }]}
          onPress={handleSignup}
        >
          <Text style={styles.signupButtonText}>Sign-up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: "center",
    justifyContent: "center",
  },
  bannerImage: {
    height: 120,
    width: 350,
    marginVertical: 20,
  },
  title: {
    fontSize: Math.min(40, width * 0.1),
    paddingHorizontal: 20,
    textAlign: "center",
    color: 'black',
    marginTop: 40,
  },
  subTitle: {
    fontSize: Math.min(18, width * 0.05),
    paddingHorizontal: 20,
    textAlign: "center",
    color: '#7f8c8d',
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: '#ccd0d1',
    width: "80%",
    height: 58,
    borderRadius: Math.min(100, 58 / 2),
  },
  loginButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    borderRadius: Math.min(100, width * 0.25),
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: Math.min(18, width * 0.05),
  },
  signupButtonText: {
    color: '#060707',
    fontSize: Math.min(18, width * 0.05),
  },
});

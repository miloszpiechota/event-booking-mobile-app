import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    // Możesz dodać logikę logowania tutaj, a następnie nawigować do HomeScreen
    navigation.navigate("LoginScreen");
  };

  const handleSignup = () => {
    // Możesz dodać logikę rejestracji tutaj, a następnie nawigować do HomeScreen
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
    backgroundColor: '#ffffff', // kolor biały
    alignItems: "center",
    justifyContent: "center", // Wyśrodkowanie w pionie
  },
  logo: {
    height: 40,
    width: 140,
    marginVertical: 30,
  },
  bannerImage: {
    marginTop: 40, // Dodany odstęp od góry
    marginVertical: 20,
    height: 140,
    width: 400,
  },
  title: {
    fontSize: 40,
    // Usunięto konkretną czcionkę
    paddingHorizontal: 20,
    textAlign: "center",
    color: 'black', // kolor czarny
    marginTop: 40,
  },
  subTitle: {
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: "center",
    color: '#7f8c8d', // kolor szary
    // Usunięto konkretną czcionkę
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: '#ccd0d1', // kolor szary
    width: "80%",
    height: 58,
    borderRadius: 100,
  },
  loginButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    borderRadius: 100,
  },
  loginButtonText: {
    color: '#ffffff', 
    fontSize: 18,
    // Usunięto konkretną czcionkę
  },
  signupButtonText: {
    color: '#060707', 
    fontSize: 18,
    // Usunięto konkretną czcionkę
  },
});

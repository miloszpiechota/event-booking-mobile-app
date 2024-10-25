import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    // Możesz dodać logikę logowania tutaj, a następnie nawigować do HomeScreen
    navigation.navigate("HomeScreen");
  };

  const handleSignup = () => {
    // Możesz dodać logikę rejestracji tutaj, a następnie nawigować do HomeScreen
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      
      <Image source={require("../assets/backgroundImage.jpg")} style={styles.bannerImage} />
      <Text style={styles.title}>Lorem ipsum dolor.</Text>
      <Text style={styles.subTitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore 
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.loginButtonWrapper, { backgroundColor: '#3498db' }]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginButtonWrapper, { backgroundColor: '#2ecc71' }]}
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
    height: 250,
    width: 231,
  },
  title: {
    fontSize: 40,
    fontFamily: 'HelveticaNeue-SemiBold', // przykładowa czcionka
    paddingHorizontal: 20,
    textAlign: "center",
    color: '#3498db', // kolor niebieski
    marginTop: 40,
  },
  subTitle: {
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: "center",
    color: '#7f8c8d', // kolor szary
    fontFamily: 'HelveticaNeue-Medium', // przykładowa czcionka
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: '#3498db', // kolor niebieski
    width: "80%",
    height: 60,
    borderRadius: 100,
  },
  loginButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    borderRadius: 98,
  },
  loginButtonText: {
    color: '#ffffff', 
    fontSize: 18,
    fontFamily: 'HelveticaNeue-SemiBold', 
  },
  signupButtonText: {
    color: '#ffffff', 
    fontSize: 18,
    fontFamily: 'HelveticaNeue-SemiBold', 
  },
});

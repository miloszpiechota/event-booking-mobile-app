import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
  import { useNavigation } from "@react-navigation/native";
  
  const SignUpScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [zipcode, setZipCode] = useState('');
    const [street, setStreet] = useState('');
    const [idcity, setIdCity] = useState('');
    const [password, setPassword] = useState('');
    const [secureEntry, setSecureEntry] = useState(true);
  
    const handleGoBack = () => {
        navigation.navigate("WelcomeScreen");
      };
  
    const handleSignup = async () => {
      if (!name || !email || !password) {
        alert("Please fill out all required fields.");
        return;
      }
  
      const userData = {
        name,
        second_name: secondName,
        surname,
        email,
        phonenumber,
        zipcode,
        street,
        idcity,
        password,
      };
  
      try {
        const response = await fetch('http://192.168.56.1:3000/users/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (!response.ok) {
          const errorResponse = await response.json();
          console.error('Error response:', errorResponse);
  
          if (response.status === 400) {
            alert("Invalid input. Please check your details.");
          } else if (response.status === 401) {
            alert("Unauthorized. Please try logging in.");
          } else if (response.status === 409) {
            alert("Email already exists. Please use a different email.");
          } else if (response.status === 500) {
            alert("Server error. Please try again later.");
          } else {
            alert("Signup failed. Please try again.");
          }
  
          throw new Error('Signup failed.');
        }
  
        const result = await response.json();
        console.log('User created successfully:', result);
        navigation.navigate("HomeScreen");
  
      } catch (error) {
        console.error('Error during signup:', error);
        alert(`Error: ${error.message}`);
      }
    };
  
    return (
      <View style={styles.container}>
        
  
        <Text style={styles.headingText}>User Registration</Text>
  
        {/* form */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name={"person"} size={30} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your name"
              placeholderTextColor={colors.secondary}
              value={name}
              onChangeText={setName}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Ionicons name={"person"} size={30} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your second name"
              placeholderTextColor={colors.secondary}
              value={secondName}
              onChangeText={setSecondName}
            />
          </View>
  
          <View style={styles.inputContainer}>
            <Ionicons name={"person"} size={30} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your surname"
              placeholderTextColor={colors.secondary}
              value={surname}
              onChangeText={setSurname}
            />
          </View>
  
          <View style={styles.inputContainer}>
            <Ionicons name={"mail-outline"} size={30} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              placeholderTextColor={colors.secondary}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
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
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setSecureEntry((prev) => !prev)}>
              <SimpleLineIcons name={secureEntry ? "eye" : "eye-off"} size={20} color={colors.secondary} />
            </TouchableOpacity>
          </View>
  
          <View style={styles.inputContainer}>
            <Ionicons name={"call"} size={30} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your phone number"
              placeholderTextColor={colors.secondary}
              keyboardType="phone-pad"
              value={phonenumber}
              onChangeText={setPhoneNumber}
            />
          </View>
  
          <View style={styles.inputContainer}>
            <Ionicons name={"home"} size={30} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your street"
              placeholderTextColor={colors.secondary}
              value={street}
              onChangeText={setStreet}
            />
          </View>
  
          <View style={styles.inputContainer}>
            <Ionicons name={"home"} size={30} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your zipcode"
              placeholderTextColor={colors.secondary}
              value={zipcode}
              onChangeText={setZipCode}
            />
          </View>
  
          <View style={styles.inputContainer}>
            <Ionicons name={"map"} size={30} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter city ID"
              placeholderTextColor={colors.secondary}
              value={idcity}
              onChangeText={setIdCity}
            />
          </View>
  
          <TouchableOpacity style={styles.signupButtonWrapper} onPress={handleSignup}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
  
          <View style={styles.footerContainer}>
            <Text style={styles.accountText}>Already have an account?</Text>
            <TouchableOpacity onPress={handleGoBack}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  const colors = {
    primary: "#1f2122",
    secondary: "#7f8c8d",
    white: "#ffffff",
    gray: "#fafdfb",
    black: "#C4DFE6",
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      padding: 20,
    },
    backButtonWrapper: {
      height: 40,
      width: 40,
      backgroundColor: colors.gray,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    headingText: {
      fontSize: 32,
      color: colors.primary,
      marginBottom: 15,
      marginTop: 80
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
    signupButtonWrapper: {
      backgroundColor: colors.primary,
      borderRadius: 100,
      marginTop: 20,
    },
    signupText: {
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
    loginText: {
      color: colors.primary,
    },
  });
  
  export default SignUpScreen;
  
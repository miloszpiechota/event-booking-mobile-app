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
import { Alert } from "react-native";
import { handleSignup } from '../database/SignUp'; // Upewnij się, że ścieżka jest poprawna

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureEntry, setSecureEntry] = useState(true);
  const [phonenumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [idcity, setIdCity] = useState("");

  const handleGoBack = () => {
    navigation.goBack();
  };

  const onSignup = async () => {
    const userData = {
      name,
      second_name: secondName,
      surname,
      iduser_type: 1, // Ustalona wartość lub pobrana z innego źródła
      email,
      phonenumber: parseInt(phonenumber),
      zipcode,
      street,
      idcity: parseInt(idcity),
      password,
    };

    const result = await handleSignup(userData);

    if (result.success) {
      Alert.alert("Success", result.message);
    } else {
      Alert.alert("Error", result.message);
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

        <TouchableOpacity style={styles.signupButtonWrapper} onPress={onSignup}>
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
  headingText: {
    fontSize: 32,
    color: colors.primary,
    marginBottom: 15,
    marginTop: 80,
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

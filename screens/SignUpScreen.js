import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useEffect } from "react"; 
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import { handleSignup } from '../database/SignUp'; 
import { Picker } from '@react-native-picker/picker'; 
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { API_BASE_URL } from '@env';

// Definiujemy schemat walidacji
const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  secondName: Yup.string().required('Second name is required'),
  surname: Yup.string().required('Surname is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password too short').required('Password is required'),
  phonenumber: Yup.string().required('Phone number is required').matches(/^\d{9}$/, 'Phone number must be 10 digits'),
  street: Yup.string().required('Street is required'),
  zipcode: Yup.string().required('Zipcode is required'),
  selectedCity: Yup.string().required('City is required'),
});

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  
  const [cities, setCities] = React.useState([]); // stan do przechowywania miast

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}:3000/api/cities/read`); 
        const data = await response.json();
        setCities(data); // ustaw dane miast w stanie
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const onSignup = async (data) => {
    const userData = {
      ...data,
      iduser_type: 1, // Ustalona wartość lub pobrana z innego źródła
      phonenumber: parseInt(data.phonenumber),
      idcity: parseInt(data.selectedCity), // użyj wybranego miasta
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

      <View style={styles.formContainer}>
        {/* Formularz */}
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Ionicons name={"person"} size={30} color={colors.secondary} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your name"
                placeholderTextColor={colors.secondary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
            </View>
          )}
        />
        
        <Controller
          control={control}
          name="secondName"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Ionicons name={"person"} size={30} color={colors.secondary} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your second name"
                placeholderTextColor={colors.secondary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.secondName && <Text style={styles.errorText}>{errors.secondName.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="surname"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Ionicons name={"person"} size={30} color={colors.secondary} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your surname"
                placeholderTextColor={colors.secondary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.surname && <Text style={styles.errorText}>{errors.surname.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Ionicons name={"mail-outline"} size={30} color={colors.secondary} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your email"
                placeholderTextColor={colors.secondary}
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <SimpleLineIcons name={"lock"} size={30} color={colors.secondary} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your password"
                placeholderTextColor={colors.secondary}
                secureTextEntry={true}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="phonenumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Ionicons name={"call"} size={30} color={colors.secondary} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your phone number"
                placeholderTextColor={colors.secondary}
                keyboardType="phone-pad"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.phonenumber && <Text style={styles.errorText}>{errors.phonenumber.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="street"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Ionicons name={"home"} size={30} color={colors.secondary} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your street"
                placeholderTextColor={colors.secondary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.street && <Text style={styles.errorText}>{errors.street.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="zipcode"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Ionicons name={"home"} size={30} color={colors.secondary} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your zipcode"
                placeholderTextColor={colors.secondary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.zipcode && <Text style={styles.errorText}>{errors.zipcode.message}</Text>}
            </View>
          )}
        />

        {/* Dodaj rozwijaną listę miast */}
        <Controller
          control={control}
          name="selectedCity"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Ionicons name={"map"} size={30} color={colors.secondary} />
              <Picker
                selectedValue={value}
                style={styles.picker}
                onValueChange={(itemValue) => onChange(itemValue)}
                onBlur={onBlur}
              >
                <Picker.Item label="Select a city" value="" />
                {cities.map((city) => (
                  <Picker.Item key={city.idcity} label={city.city} value={city.idcity.toString()} />
                ))}
              </Picker>
              {errors.selectedCity && <Text style={styles.errorText}>{errors.selectedCity.message}</Text>}
            </View>
          )}
        />

        <TouchableOpacity 
          style={styles.signupButtonWrapper} 
          onPress={handleSubmit(onSignup)} // Zmieniamy, aby użyć handleSubmit
        >
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
  primary: "#011C40",
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
    
  },
  formContainer: {
    marginTop: 10,
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
  picker: {
    flex: 1,
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
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default SignUpScreen;

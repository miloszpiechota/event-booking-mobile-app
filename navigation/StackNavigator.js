import Feather from '@expo/vector-icons/Feather';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PlacesScreen from "../screens/PlacesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // Import MaterialIcons
import EventScreen from "../screens/EventScreen";
import SeatCategoryScreen from "../screens/SeatCategoryScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ShoppingScreen from "../screens/ShopCartScreen"; 
import QrScanner from "../screens/QrScanner"; // Import QrScanner
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

console.log("Icons imported successfully");

const HomeStack = createNativeStackNavigator();

function HomeStackScreens() {
  console.log("Rendering HomeStackScreens");

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
        options={{ headerShown: false }} 
      />
      <HomeStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <HomeStack.Screen 
        name="SignUpScreen" 
        component={SignUpScreen} 
        options={{ title: "Registration Screen" }}
      />
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "" }}
      />
      <HomeStack.Screen name="Places" component={PlacesScreen} />
      <HomeStack.Screen name="Event" component={EventScreen} />
      <HomeStack.Screen name="SeatCategory" component={SeatCategoryScreen} />
      <HomeStack.Screen name="Confirmation" component={ConfirmationScreen} />
    </HomeStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();

function ProfileStackScreens() {
  console.log("Rendering ProfileStackScreens");

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Shopping" component={ShoppingScreen} />
      <ProfileStack.Screen name="QrScanner" component={QrScanner} />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function Navigation() {
  console.log("Rendering Navigation");

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStackScreens}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: null,
            
            tabBarIcon: ({ focused }) => {
              
              return focused ? (
                <FontAwesome5 name="home" size={24} color="black" />
              ) : (
                <FontAwesome5 name="home" size={24} color="black" />
              );
            }
          }}
        />
        <Tab.Screen
          name="Shopping"
          component={ShoppingScreen}
          options={{
            tabBarLabel: "Shop",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: null,
            
            tabBarIcon: ({ focused }) => {
              
              return focused ? (
                <Entypo name="box" size={24} color="black" />
              ) : (
                <Entypo name="box" size={24} color="black" />
              );
            }
          }}
        />
        <Tab.Screen
          name="QrScanner"
          component={QrScanner}
          options={{
            tabBarLabel: "QR Scanner",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: null,
            
            tabBarIcon: ({ focused }) => {
              
              return focused ? (
                <Ionicons name="qr-code" size={24} color="black" />
              ) : (
                <Ionicons name="qr-code" size={24} color="black" />
              );
            }
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileStackScreens}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: null,
            
            tabBarIcon: ({ focused }) => {
              
              return focused ? (
                <MaterialIcons name="account-circle" size={24} color="black" />
              ) : (
                <MaterialIcons name="account-circle" size={24} color="black" />
              );
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

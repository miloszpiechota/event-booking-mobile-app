import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PlacesScreen from "../screens/PlacesScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ShoppingScreen from "../screens/ShopCartScreen";
import QrScanner from "../screens/QrScanner";
import { UserContext } from "../UserContext";
import { Ionicons, FontAwesome5, MaterialIcons, Entypo } from "@expo/vector-icons";

const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Home Stack
function HomeStackScreens({ isLoggedIn }) {
  return (
    <HomeStack.Navigator initialRouteName={isLoggedIn ? "HomeScreen" : "Welcome"}>
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
        options={{ title: "Sign Up" }}
      />
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "" }}
      />
      <HomeStack.Screen name="Places" component={PlacesScreen} />
    </HomeStack.Navigator>
  );
}

// Profile Stack
function ProfileStackScreens() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Shopping" component={ShoppingScreen} />
      <ProfileStack.Screen name="QrScanner" component={QrScanner} />
    </ProfileStack.Navigator>
  );
}

// Main Navigation
function Navigation() {
  const { user } = useContext(UserContext);

  console.log("User in Navigation:", user); // Debugging

  return (
    <NavigationContainer>
      {user?.userId ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={() => <HomeStackScreens isLoggedIn={true} />}
            options={{
              tabBarLabel: "Home",
              tabBarLabelStyle: { color: "black" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? <FontAwesome5 name="home" size={24} color="black" /> : <FontAwesome5 name="home" size={24} color="black" />,
            }}
          />
          <Tab.Screen
            name="Shopping"
            component={ShoppingScreen}
            options={{
              tabBarLabel: "Shop",
              tabBarLabelStyle: { color: "black" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? <Entypo name="box" size={24} color="black" /> : <Entypo name="box" size={24} color="black" />,
            }}
          />
          {user.userType === 4 && ( // Show QrScanner only for 'events_ticket_validator'
            <Tab.Screen
              name="QrScanner"
              component={QrScanner}
              options={{
                tabBarLabel: "QR Scanner",
                tabBarLabelStyle: { color: "black" },
                headerShown: false,
                tabBarIcon: ({ focused }) =>
                  focused ? <Ionicons name="qr-code" size={24} color="black" /> : <Ionicons name="qr-code" size={24} color="black" />,
              }}
            />
          )}
          <Tab.Screen
            name="ProfileScreen"
            component={ProfileStackScreens}
            options={{
              tabBarLabel: "Profile",
              tabBarLabelStyle: { color: "black" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? <MaterialIcons name="account-circle" size={24} color="black" /> : <MaterialIcons name="account-circle" size={24} color="black" />,
            }}
          />
        </Tab.Navigator>
      ) : (
        <HomeStackScreens isLoggedIn={false} />
      )}
    </NavigationContainer>
  );
}

export default Navigation;

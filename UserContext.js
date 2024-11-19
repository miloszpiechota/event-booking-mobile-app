import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: null,
    userName: null,
    userEmail: null,
    token: null,
  });

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("userToken");

      if (userData) {
        const parsedData = JSON.parse(userData);
        setUser({ ...parsedData, token }); // Ensure the token is added to the user context
      }
    } catch (error) {
      console.log("Error loading user data", error);
    }
  };

  const storeUserData = async (userData) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.log("Error storing user data", error);
    }
  };

  const clearUserData = async () => {
    try {
      await AsyncStorage.multiRemove(["user", "userToken"]);
    } catch (error) {
      console.log("Error clearing user data", error);
    }
  };

  useEffect(() => {
    loadUserData(); // Load user data when the app starts
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: (newUser) => {
          setUser(newUser);
          storeUserData(newUser);
        },
        logout: async () => {
          setUser({ userId: null, userName: null, userEmail: null, token: null });
          await clearUserData();
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

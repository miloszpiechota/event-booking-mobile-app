import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native'; // Import AsyncStorage

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: null,
    userName: null,
    userEmail: null,
  });

  // Function to retrieve user data from AsyncStorage
  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData)); // Set user data from AsyncStorage
      }
    } catch (error) {
      console.log("Error loading user data", error);
    }
  };

  // Function to store user data to AsyncStorage
  const storeUserData = async (userData) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.log("Error storing user data", error);
    }
  };

  // Function to remove user data from AsyncStorage
  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.log("Error clearing user data", error);
    }
  };

  // Load user data on component mount
  useEffect(() => {
    loadUserData(); // Load user data when the app starts
  }, []);

  // Return the context provider with user and methods
  return (
    <UserContext.Provider
      value={{
        user,
        setUser: (newUser) => {
          setUser(newUser); // Update user state
          storeUserData(newUser); // Persist user data to AsyncStorage
        },
        logout: async () => {
          setUser({ userId: null, userName: null, userEmail: null }); // Reset user state
          await clearUserData(); // Clear user data from AsyncStorage
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

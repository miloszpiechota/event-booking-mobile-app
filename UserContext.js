import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Correct import

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: null,
    userName: null,
    userEmail: null,
  });

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.log("Error loading user data", error);
    }
  };

  const storeUserData = async (userData) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.log("Error storing user data", error);
    }
  };

  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.log("Error clearing user data", error);
    }
  };

  useEffect(() => {
    loadUserData();
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
          setUser({ userId: null, userName: null, userEmail: null });
          await clearUserData();
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

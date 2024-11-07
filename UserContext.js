import React, { createContext, useContext, useState } from 'react';

// Tworzymy kontekst
const UserContext = createContext();

// Tworzymy provider, który będzie dostarczał dane użytkownika
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Przechowujemy dane użytkownika

  const loginUser = (userData) => {
    setUser(userData); // Zapisujemy dane użytkownika
  };

  const logoutUser = () => {
    setUser(null); // Usuwamy dane użytkownika
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook do dostępu do kontekstu
export const useUserContext = () => {
  return useContext(UserContext);
};

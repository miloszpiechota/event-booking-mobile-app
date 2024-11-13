import { createContext, useState } from "react";

const Place = createContext();

const PlaceProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(""); // Store the selected city here
  return (
    <Place.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </Place.Provider>
  );
};

export { Place, PlaceProvider };

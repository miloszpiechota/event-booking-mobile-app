import { createContext, useState } from "react";

const Place = createContext();
//This is context code in React that allows you to make data
// available in the tree without having to manually
// provide it through props at each level.
const PlaceContext = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState("");
  return (
    <Place.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </Place.Provider>
  );
};

export { Place, PlaceContext };

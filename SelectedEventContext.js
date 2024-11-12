import { createContext, useState } from 'react';

export const SelectedEventContext = createContext();

export const SelectedEventProvider = ({ children }) => {
  const [selectedEventData, setSelectedEventData] = useState(null);

  return (
    <SelectedEventContext.Provider value={{ selectedEventData, setSelectedEventData }}>
      {children}
    </SelectedEventContext.Provider>
  );
};

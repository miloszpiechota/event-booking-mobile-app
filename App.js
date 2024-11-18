import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Navigation from "./navigation/StackNavigator";
import { enableScreens } from "react-native-screens";
import Modal from "react-native-modal"; // Replacing ModalPortal from react-native-modals
import { UserProvider } from "./UserContext";
import { SelectedEventProvider } from "./SelectedEventContext";
import { PlaceProvider } from "./PlacesContext";
import { useState } from "react";
import { View, Text, Button } from "react-native";

enableScreens();

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <UserProvider>
        <SelectedEventProvider>
          <PlaceProvider>
            <Navigation />
            
            
          </PlaceProvider>
        </SelectedEventProvider>
      </UserProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});

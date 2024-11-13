import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from "./navigation/StackNavigator"

import { ModalPortal } from 'react-native-modals';
import { UserProvider } from './UserContext';
import { SelectedEventProvider } from './SelectedEventContext';
import { PlaceProvider } from './PlacesContext';
export default function App() {
  return (
    <>
     <UserProvider>
      <SelectedEventProvider>
        <PlaceProvider>
          <Navigation />
          <ModalPortal />
        </PlaceProvider>
      </SelectedEventProvider>
    </UserProvider>
    
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



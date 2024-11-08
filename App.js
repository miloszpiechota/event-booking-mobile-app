import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from "./navigation/StackNavigator"
import { PlaceContext } from './PlacesContext';
import { ModalPortal } from 'react-native-modals';
import { UserProvider } from './UserContext';
export default function App() {
  return (
    <>
    <UserProvider>
      <PlaceContext>
        <Navigation />
        <ModalPortal />
      </PlaceContext>
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



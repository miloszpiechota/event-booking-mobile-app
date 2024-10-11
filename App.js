import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from "./navigation/StackNavigator"
import { PlaceContext } from './PlacesContext';

export default function App() {
  return (
    <>
    <PlaceContext>
    <Navigation/>
    </PlaceContext>
    
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



import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from "./navigation/StackNavigator"
import { PlaceContext } from './PlacesContext';
import { ModalPortal } from 'react-native-modals';

export default function App() {
  return (
    <>
    <PlaceContext>
    <Navigation/>
    <ModalPortal/>
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

{/* <Text>Lokalizacja</Text>
      <Text>Czas trwania wydarzenia: 'start_date'-'end_date'</Text>
      <Text>Ile trwa dane wydarzenie?</Text>
      <Text>Kategoria wydarzenia 'fk_idevent_category'</Text>
      <Text>Czy podział na miejsca? 'is_seat_categorized'</Text>
      <Text>Cena za bilet/Cena za bilet według kategorii miejsc</Text> */}

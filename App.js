import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Navigation from "./navigation/StackNavigator";
import { enableScreens } from 'react-native-screens';
import { ModalPortal } from 'react-native-modals';
import { UserProvider } from './UserContext';
import { SelectedEventProvider } from './SelectedEventContext';
import { PlaceProvider } from './PlacesContext';

enableScreens();

export default function App() {
  return (
    <>
      <UserProvider>
        <SelectedEventProvider>
          <PlaceProvider>
            <Navigation />
          </PlaceProvider>
        </SelectedEventProvider>
      </UserProvider>
      {/* Mount ModalPortal at the root level */}
      <ModalPortal />
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

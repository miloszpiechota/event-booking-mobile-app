import React, { useState, useEffect,useContext } from 'react';
import { View, TextInput, Text, FlatList, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { fetchCoordinates } from '../database/FetchCoordinates'; // Import funkcji fetchCoordinates
import { fetchLocations } from '../database/FetchLocations'; // Import funkcji fetchLocations
import { Place } from '../PlacesContext';
const PlacesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState([]); // Lista lokalizacji do wyświetlenia
  const [selectedLocation, setSelectedLocation] = useState(null); // Wybrana lokalizacja
  const { setSelectedCity } = useContext(Place);
  // Funkcja do obsługi wyszukiwania
  const handleSearch = (text) => {
    setSearchQuery(text);
    // Tu można dodać filtrację lokalizacji na podstawie tekstu
  };

  
  const handleSelectLocation = async (location) => {
    setSelectedCity({ name: location.city, id: location.id }); // Set city with name and id
    const coords = await fetchCoordinates(location.name, location.city);
    if (coords) {
      setSelectedLocation({
        ...location,
        coordinates: coords,
      });
    }
  };

  // Załadowanie lokalizacji z bazy danych
  useEffect(() => {
    const loadLocations = async () => {
      const locationsData = await fetchLocations(); // Pobranie lokalizacji z bazy
      setLocations(locationsData);
    };
    loadLocations();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Pasek wyszukiwania */}
      <View style={{ margin: 10, padding: 10, flexDirection: 'row', borderColor: '#e0e0e0', borderWidth: 1, borderRadius: 30 }}>
        <TextInput
          placeholder="Search location"
          value={searchQuery}
          onChangeText={handleSearch}
          style={{ flex: 1, marginRight: 10 }}
        />
        <FontAwesome name="search" size={24} color="black" />
      </View>

      {/* Lista wyników wyszukiwania */}
      <FlatList
        data={locations.filter(location => location.name.toLowerCase().includes(searchQuery.toLowerCase()))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleSelectLocation(item)}
            style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }}
          >
            <Text>{`${item.name}, ${item.city}`}</Text>
            {/* Wyświetlanie miasta obok nazwy lokalizacji */}
          </Pressable>
        )}
        style={{ marginHorizontal: 20 }}
      />

      {/* Jeśli wybrano lokalizację, wyświetl mapę */}
      {selectedLocation && selectedLocation.coordinates && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Selected Location: {selectedLocation.name}</Text>

          <MapView
            style={{ width: '100%', height: 300, marginTop: 10 }}
            region={{
              latitude: selectedLocation.coordinates.latitude,
              longitude: selectedLocation.coordinates.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            <Marker
              coordinate={selectedLocation.coordinates}
              title={selectedLocation.name}
            />
          </MapView>
        </View>
      )}
    </View>
  );
};

export default PlacesScreen;

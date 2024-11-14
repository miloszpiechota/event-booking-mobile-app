import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { fetchCoordinates } from '../database/FetchCoordinates';
import { fetchLocations } from '../database/FetchLocations';
import { Place } from '../PlacesContext';

const PlacesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { setSelectedCity } = useContext(Place);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleSelectLocation = async (location) => {
    setSelectedCity({ name: location.city, id: location.id });
    const coords = await fetchCoordinates(location.name, location.city);
    if (coords) {
      setSelectedLocation({
        ...location,
        coordinates: coords,
      });
    }
  };

  useEffect(() => {
    const loadLocations = async () => {
      const locationsData = await fetchLocations();
      setLocations(locationsData);
    };
    loadLocations();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search location"
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
        <FontAwesome name="search" size={24} color="#757575" />
      </View>

      <FlatList
        data={locations.filter(location => location.name.toLowerCase().includes(searchQuery.toLowerCase()))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleSelectLocation(item)}
            style={styles.locationItem}
          >
            <Text style={styles.locationText}>{`${item.name}, ${item.city}`}</Text>
          </Pressable>
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      {selectedLocation && selectedLocation.coordinates && (
        <View style={styles.mapContainer}>
          <Text style={styles.selectedLocationText}>Selected Location: {selectedLocation.name}</Text>
          <MapView
            style={styles.map}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
    color: '#333',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  locationItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  locationText: {
    fontSize: 16,
    color: '#333',
  },
  mapContainer: {
    marginTop: 20,
  },
  selectedLocationText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useLayoutEffect, useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MapView, { Marker } from "react-native-maps";

import { fetchLocations } from "../database/FetchLocations"; // Import fetchLocations
import { Place } from "../PlacesContext"; // Import PlaceContext

const PlacesScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState([]); // New state for fetched locations
  const [filteredLocations, setFilteredLocations] = useState([]); // State for filtered locations

  // Use PlacesContext to update selectCity
  const { selectedCity, setSelectedCity } = useContext(Place);

  // Fetch locations data on component mount
  useEffect(() => {
    const loadLocations = async () => {
      const data = await fetchLocations();
      setLocations(data); // Set fetched locations
      setFilteredLocations(data); // Initialize filteredLocations with all data
    };

    loadLocations();
  }, []);

  // Update header title
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Text style={{ fontSize: 15, letterSpacing: 1 }}>CHANGE LOCATION</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  // Handle search and filter locations
  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = locations.filter((location) =>
      location.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredLocations(filtered);
  };

  // Handle city selection
  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Search Bar */}
      <View
        style={{
          margin: 10,
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          borderColor: "#e0e0e0",
          borderWidth: 2,
          borderRadius: 30,
        }}
      >
        <TextInput
          placeholder="Search Your City"
          value={searchQuery}
          onChangeText={handleSearch}
          style={{ flex: 1, marginRight: 10 }}
        />
        <FontAwesome name="search" size={24} color="black" />
      </View>

      {/* Locations List */}
      <FlatList
        data={filteredLocations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleCitySelect(item)}
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#e0e0e0",
            }}
          >
            <Text>{item.name}</Text>
          </Pressable>
        )}
        style={{ marginHorizontal: 20 }}
      />

      {/* Selected Location */}
      {selectedCity && (
        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#333",
              marginBottom: 5,
            }}
          >
            Selected Location:
          </Text>
          <Text style={{ fontSize: 20, color: "#007bff", fontWeight: "600" }}>
            {selectedCity.name}
          </Text>

          {/* Map */}
          <MapView
            style={{ width: "100%", height: 300, marginTop: 10 }}
            region={{
              latitude: selectedCity.latitude || 0,
              longitude: selectedCity.longitude || 0,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            showsUserLocation={true}
          >
            <Marker
              coordinate={{
                latitude: selectedCity.latitude || 0,
                longitude: selectedCity.longitude || 0,
              }}
              title={selectedCity.name}
            />
          </MapView>
        </View>
      )}
    </View>
  );
};

export default PlacesScreen;

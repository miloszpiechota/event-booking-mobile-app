import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useLayoutEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MapView, { Marker } from "react-native-maps";

import { cities } from "../assets/data/cities";


import { Place } from "../PlacesContext"; //Added

const PlacesScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState(cities);

  //use PlacesContext to update selectCity
  const { selectedCity, setSelectedCity } = useContext(Place);
//Added
 
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Pressable
          style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
        >
          <Text style={{ fontSize: 15, letterSpacing: 1 }}>
            CHANGE LOCATION
          </Text>
        </Pressable>
      ),
    });
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = cities.filter((city) =>
      city.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCities(filtered);
  };

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

      {/* Cities List */}
      <FlatList
        data={filteredCities}
        keyExtractor={(item) => item.name}
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

      {/* Selected City */}
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
              latitude: selectedCity.latitude,
              longitude: selectedCity.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            showsUserLocation={true} // Optional: show the user's location on the map
          >
            <Marker
              coordinate={{
                latitude: selectedCity.latitude,
                longitude: selectedCity.longitude,
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

const styles = StyleSheet.create({});

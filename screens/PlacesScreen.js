import { Pressable, StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useLayoutEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MapView, { Marker } from 'react-native-maps';

const cities = [
  { name: "Warszawa", latitude: 52.2297, longitude: 21.0122 },
  { name: "Kraków", latitude: 50.0647, longitude: 19.9450 },
  { name: "Wrocław", latitude: 51.1079, longitude: 17.0385 },
  { name: "Gdańsk", latitude: 54.3520, longitude: 18.6466 },
  { name: "Poznań", latitude: 52.4064, longitude: 16.9252 },
  // Dodaj więcej miast
];

const PlacesScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState(cities);
  const [selectedCity, setSelectedCity] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Text style={{ fontSize: 15, letterSpacing: 1 }}>CHANGE LOCATION</Text>
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
      {/* Wyszukiwarka */}
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

      {/* Lista miast */}
      <FlatList
        data={filteredCities}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleCitySelect(item)}
            style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#e0e0e0" }}
          >
            <Text>{item.name}</Text>
          </Pressable>
        )}
        style={{ marginHorizontal: 20 }}
      />

      {/* Wybrane miasto */}
      {selectedCity && (
        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          <Text>Selected Location</Text>
          <Text>{selectedCity.name}</Text>

          {/* Mapa */}
          <MapView
            style={{ width: '100%', height: 300, marginTop: 10 }}
            initialRegion={{
              latitude: selectedCity.latitude,
              longitude: selectedCity.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
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

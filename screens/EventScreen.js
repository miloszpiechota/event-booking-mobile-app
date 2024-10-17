import { ScrollView, StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";

const EventScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const { title, photo, description } = route.params; // Odbieramy przekazane dane

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title, // Ustawiamy tytuł
      headerStyle: {
        backgroundColor: "#F5F5F5",
        shadowOpacity: 0.3,
        shadowOffset: { width: -1, height: 1 },
        shadowRadius: 3,
      },
    });
  }, [navigation, title]);

  return (
    <SafeAreaView>
      <View style={{ marginBottom: 55 }}>
        <Image
          style={{ height: 200, width: '100%', resizeMode: "cover" }} // Zmiana na komponent Image
          source={{ uri: photo }} // Używamy przekazanego zdjęcia
        />

        <Text>Opis</Text>
        <Text style={{ padding: 10, fontSize: 18 }}>{description}</Text>
      </View>
    </SafeAreaView>
  );
};

export default EventScreen;

const styles = StyleSheet.create({});

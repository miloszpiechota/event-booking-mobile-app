import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const EventScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    title,
    photo,
    description,
    locationName,
    cityName,
    startDate,
    endDate,
  } = route.params; // Odbieramy przekazane dane

  // Funkcja do formatowania daty na DD-MM-YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Miesiące są indeksowane od 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Funkcja do formatowania czasu
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Konwersja z milisekund na dni
    return dayDiff;
  };

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
          style={{ height: 200, width: "100%", resizeMode: "cover" }} // Ustawienie stylu obrazu
          source={{ uri: photo }} // Użycie przekazanego zdjęcia
        />

        <Text style={{ paddingHorizontal: 10, fontSize: 16, color: "gray" }}>
          {locationName}, {cityName}
        </Text>

        {/* Wyświetlenie daty wydarzenia w formacie DD-MM-YYYY */}
        <Text style={{ paddingHorizontal: 10, fontSize: 16, marginTop: 10 }}>
          <Text>Data:</Text> {formatDate(startDate)} - {formatDate(endDate)}
        </Text>

        {/* Wyświetlenie godziny wydarzenia */}
        <Text style={{ paddingHorizontal: 10, fontSize: 16, marginTop: 5 }}>
          <Text>Godzina:</Text> {formatTime(startDate)} - {formatTime(endDate)}
        </Text>

        {/* Wyświetlenie czasu trwania wydarzenia */}
        <Text style={{ paddingHorizontal: 10, fontSize: 16, marginTop: 5 }}>
          <Text>Czas trwania:</Text> {calculateDuration(startDate, endDate)} {calculateDuration(startDate, endDate) === 1 ? 'dzień' : 'dni'}
        </Text>

        {/* Linia rozdzielająca */}
        <View
          style={{
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            marginVertical: 10,
            marginHorizontal: 10,
          }}
        />
        <Text>Opis:</Text>
        <Text style={{ padding: 10, fontSize: 18 }}>{description}</Text>
      </View>
    </SafeAreaView>
  );
};

export default EventScreen;

const styles = StyleSheet.create({});

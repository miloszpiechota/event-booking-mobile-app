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
    isSeatCategorized,
    price
  } = route.params; // Receiving the passed data

  // Function to format the date to DD-MM-YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Function to format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Function to calculate the duration
  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Conversion from milliseconds to days
    return dayDiff;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title, // Setting the title
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
          style={{ height: 200, width: "100%", resizeMode: "cover" }} // Setting image style
          source={{ uri: photo }} // Using the passed photo
        />

        <Text style={{ paddingHorizontal: 10, fontSize: 16, color: "gray" }}>
          {locationName}, {cityName}
        </Text>

        {/* Displaying the event date in DD-MM-YYYY format */}
        <Text style={{ paddingHorizontal: 10, fontSize: 16, marginTop: 10 }}>
          <Text>Data:</Text> {formatDate(startDate)} - {formatDate(endDate)}
        </Text>

        {/* Displaying the event time */}
        <Text style={{ paddingHorizontal: 10, fontSize: 16, marginTop: 5 }}>
          <Text>Godzina:</Text> {formatTime(startDate)} - {formatTime(endDate)}
        </Text>

        {/* Displaying the event duration */}
        <Text style={{ paddingHorizontal: 10, fontSize: 16, marginTop: 5 }}>
          <Text>Czas trwania:</Text> {calculateDuration(startDate, endDate)} {calculateDuration(startDate, endDate) === 1 ? 'dzień' : 'dni'}
        </Text>

        {/* Separator line */}
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
        <View
          style={{
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            marginVertical: 10,
            marginHorizontal: 10,
          }}
        />

        <Text>Dodatkowe informacje: </Text>
        <Text>
          Czy na wydarzeniu obowiązuje podział na kategorie miejsc: {isSeatCategorized ? "Tak" : "Nie"}
        </Text>

        {/* Conditional rendering based on isSeatCategorized */}
        {isSeatCategorized ? (
          <>
            <Text>Cena za pierwsza kategorie: {price * 3.0}</Text>
            <Text>Cena za druga kategorie: {price * 2.0}</Text>
            <Text>Cena za trzecia kategorie: {price * 1.0}</Text>
          </>
        ) : (
          <Text>Cena za bilet: {price}</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default EventScreen;

const styles = StyleSheet.create({});

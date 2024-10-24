import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Pressable, // Importujemy TouchableOpacity
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
    price,
    categoryType,
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

  // Function to handle booking
  const handleBooking = () => {
    // Here you can handle the booking logic (e.g., navigate to a booking page)
    console.log("Booking for:", title); // For demonstration, log the event title
  };

  console.log("EventScreen params:", route.params);
  console.log("isSeatCategorized:", isSeatCategorized);

  return (
    <SafeAreaView>
      <View style={{ marginBottom: 55 }}>
        <Image
          style={styles.image} // Using the style defined below
          source={{ uri: photo }} // Using the passed photo
        />

        {/* Displaying the event date in DD-MM-YYYY format */}
        <Text style={styles.infoText}>
          <Text style={styles.label}>Data:</Text> {formatDate(startDate)} -{" "}
          {formatDate(endDate)}
        </Text>

        {/* Displaying the event time */}
        <Text style={styles.infoText}>
          <Text style={styles.label}>Godzina:</Text> {formatTime(startDate)} -{" "}
          {formatTime(endDate)}
        </Text>

        <Text style={styles.infoText}>
          <Text style={styles.label}>Kategoria:</Text>{" "}
          {categoryType || "Nieznana kategoria"}
        </Text>

        {/* Displaying the event duration */}
        <Text style={styles.infoText}>
          <Text style={styles.label}>Czas trwania:</Text>{" "}
          {calculateDuration(startDate, endDate)}{" "}
          {calculateDuration(startDate, endDate) === 1 ? "dzień" : "dni"}
        </Text>

        {/* Separator line */}
        <View style={styles.separator} />

        <Text style={styles.descriptionLabel}>Opis:</Text>
        <Text style={styles.descriptionText}>{description}</Text>

        <View style={styles.separator} />

        <Text style={styles.additionalInfoLabel}>Dodatkowe informacje: </Text>
        <Text style={styles.additionalInfoText}>
          Czy na wydarzeniu obowiązuje podział na kategorie miejsc:{" "}
          {isSeatCategorized ? "Tak" : "Nie"}
        </Text>

        {/* Conditional rendering based on isSeatCategorized */}
        {isSeatCategorized ? (
          <>
            <Text style={styles.priceText}>
              Cena za pierwszą kategorię: {price * 3.0}
            </Text>
            <Text style={styles.priceText}>
              Cena za drugą kategorię: {price * 2.0}
            </Text>
            <Text style={styles.priceText}>
              Cena za trzecią kategorię: {price * 1.0}
            </Text>
          </>
        ) : (
          <Text style={styles.priceText}>Cena za bilet: {price}</Text>
        )}

        {/* Button to book the event */}
        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate(
              isSeatCategorized ? "SeatCategory" : "Confirmation",
              {
                title,
                photo,
                description,
                locationName,
                cityName,
                startDate,
                endDate,
                isSeatCategorized,
                price,
                categoryType,
              }
            )
          }
        >
          <Text style={styles.buttonText}>BOOK</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: "100%",
    resizeMode: "cover",
  },
  locationText: {
    paddingHorizontal: 5,
    fontSize: 16,
    color: "gray",
    marginTop: 10,
  },
  infoText: {
    paddingHorizontal: 10,
    fontSize: 16,
    marginTop: 5,
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  separator: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  descriptionLabel: {
    paddingHorizontal: 5,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 7,
  },
  descriptionText: {
    padding: 10,
    fontSize: 16,
  },
  additionalInfoLabel: {
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  additionalInfoText: {
    padding: 10,
    fontSize: 16,
  },
  priceText: {
    paddingHorizontal: 10,
    fontSize: 16,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#FF6F61", // Color of the button
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
    marginTop: 20, // Margin top for spacing
  },
  buttonText: {
    color: "#fff", // Text color
    fontSize: 18,
    fontWeight: "bold",
  },
  firstTitleInfo: {
    paddingTop: 8,
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 4,
  },
});

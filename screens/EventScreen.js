import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const EventScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { eventTickets, ...restProps } = route.params;

  const {
    title,
    photo,
    description,
    locationName,
    cityName,
    startDate,
    endDate,
    isSeatCategorized,
    categoryType,
    numberOfTickets,
    userId
  } = route.params;

  // Format date and time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  };
  
  const formatTime = (dateString) =>
    new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  
  const calculateDuration = (start, end) =>
    Math.ceil((new Date(end) - new Date(start)) / (1000 * 3600 * 24));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerStyle: { backgroundColor: "#f5f5f5", shadowOpacity: 0.3 },
    });
  }, [navigation, title]);

  const handleBooking = () => {
    navigation.navigate(
      isSeatCategorized ? "SeatCategory" : "Confirmation",
      { userId,eventTickets, ...restProps } // Pass eventTickets and other props
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.detailsContainer}>
          <Image style={styles.image} source={{ uri: photo }} />

          <View style={styles.separator} />

          <Text style={styles.infoText}>
            <Text style={styles.label}>Data:</Text> {formatDate(startDate)} -{" "}
            {formatDate(endDate)}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Godzina:</Text> {formatTime(startDate)} -{" "}
            {formatTime(endDate)}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Kategoria:</Text>{" "}
            {categoryType || "Nieznana kategoria"}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Czas trwania:</Text>{" "}
            {calculateDuration(startDate, endDate)} dni
          </Text>

          <View style={styles.separator} />

          <Text style={styles.descriptionText}>{description}</Text>

          <View style={styles.separator} />

          <Text style={styles.additionalInfoText}>
            <Text style={styles.label}>Dodatkowe informacje:</Text>
          </Text>
         
          <Text style={styles.priceText}>
            Podział miejsc: {isSeatCategorized ? "Tak" : "Nie"}
          </Text>

          {eventTickets.map((ticket, index) => (
            <View key={index} style={styles.ticketContainer}>
              {isSeatCategorized ? (
                <>
                  <Text style={styles.priceText}>
                    Cena za pierwszą kategorię: {ticket.price * 3.0} zł
                  </Text>
                  <Text style={styles.priceText}>
                    Cena za drugą kategorię: {ticket.price * 2.0} zł
                  </Text>
                  <Text style={styles.priceText}>
                    Cena za trzecią kategorię: {ticket.price} zł
                  </Text>
                </>
              ) : (
                <Text style={styles.priceText}>
                  Cena za bilet: {ticket.price} zł
                </Text>
              )}
            </View>
          ))}
        </View>

        {/* Booking Button */}
        <Pressable style={styles.bookButton} onPress={handleBooking}>
          <Text style={styles.bookButtonText}>NEXT</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  detailsContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 6,
    elevation: 2,
    marginBottom: 20,
  },
  image: {
    height: 200,
    width: "100%",
    borderRadius: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 2,
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  descriptionText: {
    padding: 10,
    fontSize: 16,
    textAlign: "justify", 
    lineHeight: 22,
  },
  additionalInfoText: {
    fontSize: 16,
    color: "#333",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginVertical: 5,
  },
  bookButton: {
    backgroundColor: "#4A79D9",
    paddingVertical: 15,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

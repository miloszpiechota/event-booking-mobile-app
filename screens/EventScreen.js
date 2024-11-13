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
      { eventTickets, ...restProps, locationName, cityName }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.detailsContainer}>
          <Image style={styles.image} source={{ uri: photo }} />

          <Text style={styles.title}>{title}</Text>

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
          <Text style={styles.infoText}>
            <Text style={styles.label}>Lokalizacja:</Text> {locationName},{" "}
            {cityName}
          </Text>

          <View style={styles.separator} />

          <Text style={styles.sectionTitle}>Opis wydarzenia:</Text>
          <Text style={styles.descriptionText}>{description}</Text>

          <View style={styles.separator} />

          <Text style={styles.sectionTitle}>Dodatkowe informacje:</Text>
          <Text style={styles.additionalInfoText}>
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

        <Pressable style={styles.bookButton} onPress={handleBooking}>
          <Text style={styles.bookButtonText}>ZAREZERWUJ</Text>
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
    padding: 20,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  image: {
    height: 220,
    width: "100%",
    borderRadius: 8,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 12,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  label: {
    fontWeight: "600",
    color: "#222",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 16,
    color: "#444",
    lineHeight: 22,
    textAlign: "justify",
    marginBottom: 10,
  },
  additionalInfoText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 6,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginVertical: 3,
  },
  bookButton: {
    backgroundColor: "#4A79D9",
    paddingVertical: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

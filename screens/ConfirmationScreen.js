import {
  Alert,
  BackHandler,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const ConfirmationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Parameters passed from the previous screen
  const {
    eventTickets = [], // Default to an empty array
    title,
    selectedCategory,
    selectedPrice,
    photo,
    description,
    locationName,
    cityName,
    startDate,
    endDate,
    isSeatCategorized,
    categoryType,
    ...restProps
  } = route.params;

  const fee = 87; // Sample service fee
  const grandTotal = parseFloat(selectedPrice) + fee; // Total amount

  useEffect(() => {
    console.log("Received eventTickets:", eventTickets);
  }, [eventTickets]);

  // Disable swipe back gesture
  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
      gestureDirection: "horizontal",
    });
  }, []);

  // Handle back press for Android
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Chcesz zakończyć sesję?",
        "Powrócić do głównego ekranu?",
        [
          {
            text: "Anuluj",
            onPress: () => console.log("Anulowano"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () =>
              navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] }),
          },
        ],
        { cancelable: false }
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  // Function to get the selected category text
  const getSelectedCategoryText = () => {
    switch (selectedCategory) {
      case "firstCategory":
        return "Pierwsza Kategoria";
      case "secondCategory":
        return "Druga Kategoria";
      case "thirdCategory":
        return "Trzecia Kategoria";
      default:
        return "Brak wybranej kategorii";
    }
  };

  // Confirm payment function
  const confirmPayment = () => {
    Alert.alert(
      "Potwierdzenie",
      `Całkowita kwota do zapłaty: ${grandTotal.toFixed(2)} zł`,
      [
        {
          text: "Anuluj",
          onPress: () => console.log("Płatność anulowana"),
          style: "cancel",
        },
        {
          text: "Potwierdź",
          onPress: () => {
            console.log("Płatność potwierdzona");
            navigation.navigate("Ticket", {
              selectedCategory,
              selectedPrice,
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.category}>Kategoria: {getSelectedCategoryText()}</Text>
        <Text style={styles.price}>Cena: {selectedPrice} zł</Text>

        <View style={styles.separator} />

        <View style={styles.eventDetailsContainer}>
          <Text style={styles.sectionTitle}>Szczegóły biletu:</Text>
          {eventTickets && eventTickets.length > 0 ? (
            eventTickets.map((ticket) => (
              <View key={ticket.idevent_ticket} style={styles.ticketDetails}>
                <Text style={styles.ticketDetailText}>
                  Nazwa: {ticket.name || "Brak nazwy"}
                </Text>
                <Text style={styles.ticketDetailText}>
                  Cena regularna biletu: {ticket.price?.toFixed(2) || "Brak ceny"} zł
                </Text>
                <Text style={styles.ticketDetailText}>
                  Data rozpoczęcia:{" "}
                  {ticket.start_date
                    ? new Date(ticket.start_date).toLocaleDateString()
                    : "Brak daty"}
                </Text>
                <Text style={styles.ticketDetailText}>
                  Data zakończenia:{" "}
                  {ticket.end_date
                    ? new Date(ticket.end_date).toLocaleDateString()
                    : "Brak daty"}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.ticketDetailText}>Brak szczegółów biletu.</Text>
          )}
        </View>

        <View style={styles.separator} />

        {/* Service fee and total amount */}
        <View style={styles.feeContainer}>
          <Text style={styles.feeText}>Opłata serwisowa:</Text>
          <Text style={styles.feeAmount}>{fee} zł</Text>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Całkowita kwota do zapłaty:</Text>
          <Text style={styles.totalPrice}>{grandTotal.toFixed(2)} zł</Text>
        </View>

        <Pressable onPress={confirmPayment} style={styles.payButton}>
          <Text style={styles.payButtonText}>POTWIERDŹ PŁATNOŚĆ</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  detailsContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: "gray",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "500",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  feeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  feeText: {
    fontSize: 16,
    fontWeight: "500",
  },
  feeAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventDetailsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  ticketDetails: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  ticketDetailText: {
    fontSize: 15,
    color: "#333",
  },
  payButton: {
    marginTop: 20,
    backgroundColor: "#4a79d9",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  payButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#f9f9f9",
  },
});

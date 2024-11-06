import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { Picker } from '@react-native-picker/picker';

import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./ConfiramtionScreen.styles"; // Import styles

const fetchPaymentMethods = async () => {
  try {
    const response = await fetch("http://192.168.56.1:3000/api/payment/read");
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch payment methods:", error);
    return [];
  }
};

const ConfirmationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const {
    eventTickets = [],
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

  // Ensure selectedPrice is a valid number, default to 0 if undefined
  const initialPrice = selectedPrice && !isNaN(parseFloat(selectedPrice)) ? parseFloat(selectedPrice) : 0;
  
  const [quantity, setQuantity] = useState(1); // Default to 1 ticket
  const [grandTotal, setGrandTotal] = useState(initialPrice + fee); // Initial total
  const [paymentMethods, setPaymentMethods] = useState([]); // To store payment methods
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // To store selected payment method

  useEffect(() => {
    // Fetch payment methods from the backend
    const getPaymentMethods = async () => {
      const methods = await fetchPaymentMethods();
      setPaymentMethods(methods);
      if (methods.length > 0) {
        setSelectedPaymentMethod(methods[0].id); // Set default payment method
      }
    };

    getPaymentMethods();
  }, []);

  useEffect(() => {
    setGrandTotal(quantity * initialPrice + fee);
  }, [quantity, initialPrice]);

  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
      gestureDirection: "horizontal",
    });
  }, []);

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

  const confirmPayment = () => {
    Alert.alert(
      "Potwierdzenie",
      `Całkowita kwota do zapłaty: ${(grandTotal || 0).toFixed(2)} zł\nMetoda płatności: ${selectedPaymentMethod}`,
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
              quantity, // Pass quantity to the next screen
              selectedPaymentMethod, // Pass selected payment method
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
        <Text style={styles.price}>Cena za kategorię: {selectedPrice ? selectedPrice : "Brak ceny"} zł</Text>

        <View style={styles.separator} />

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityText}>Wybierz liczbę biletów:</Text>
          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            value={String(quantity)}
            onChangeText={(value) => setQuantity(Number(value))}
          />
        </View>

        <View style={styles.separator} />

        <View style={styles.eventDetailsContainer}>
          <Text style={styles.sectionTitle}>Szczegóły biletu:</Text>
          {eventTickets && eventTickets.length > 0 ? (
            eventTickets.map((ticket) => (
              <View key={ticket.idevent_ticket || ticket.name} style={styles.ticketDetails}>
                <Text style={styles.ticketDetailText}>
                  Nazwa: {ticket.name || "Brak nazwy"}
                </Text>
                <Text style={styles.ticketDetailText}>
                  Cena regularna biletu: {ticket.price && !isNaN(ticket.price) ? ticket.price.toFixed(2) : "Brak ceny"} zł
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

        <View style={styles.paymentMethodContainer}>
          <Text style={styles.paymentMethodText}>Wybierz metodę płatności:</Text>
          {paymentMethods.length > 0 && (
            <Picker
            selectedValue={selectedPaymentMethod}
            onValueChange={(itemValue) => setSelectedPaymentMethod(itemValue)}
          >
            {paymentMethods.map((method) => (
              <Picker.Item
                key={method.id ? method.id.toString() : `fallback-key-${method.name}`} // Use fallback if id is undefined
                label={method.name}
                value={method.id}
              />
            ))}
          </Picker>
          
          
          )}
        </View>

        <View style={styles.separator} />

        <View style={styles.feeContainer}>
          <Text style={styles.feeText}>Opłata serwisowa:</Text>
          <Text style={styles.feeAmount}>{fee} zł</Text>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Całkowita kwota:</Text>
          <Text style={styles.totalPrice}>{(grandTotal || 0).toFixed(2)} zł</Text>
        </View>

        <Pressable style={styles.payButton} onPress={confirmPayment}>
          <Text style={styles.payButtonText}>Potwierdź Płatność</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ConfirmationScreen;

import React, { useEffect, useLayoutEffect, useState, useContext } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./ConfiramtionScreen.styles"; // Import styles
import axios from "axios"; // Import axios for making HTTP requests
import { UserContext } from "../UserContext";
import { SelectedEventContext } from "../SelectedEventContext";
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
  const { user } = useContext(UserContext);
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
    numberOfTickets,
    //userId,  // Assuming userId is passed as part of route.params
  } = route.params;

  const fee = 87; // Sample service fee
  const initialPrice =
    selectedPrice && !isNaN(parseFloat(selectedPrice))
      ? parseFloat(selectedPrice)
      : 0;

  const [quantity, setQuantity] = useState(1); // Default to 1 ticket
  const [grandTotal, setGrandTotal] = useState(initialPrice + fee); // Initial total
  const [paymentMethods, setPaymentMethods] = useState([]); // To store payment methods
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // To store selected payment method
  const { setSelectedEventData } = useContext(SelectedEventContext);

  useEffect(() => {
    const getPaymentMethods = async () => {
      const methods = await fetchPaymentMethods();
      console.log("Fetched payment methods:", methods); // Log the fetched methods for debugging
      setPaymentMethods(methods);
      if (methods.length > 0) {
        setSelectedPaymentMethod(methods[0].idpayment_method); // Set the first method as default
      }
    };

    getPaymentMethods();
  }, []); // Runs once on component mount
  // Runs once on component mount

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

  const confirmPayment = async () => {
    try {
      // Prepare data to send to the backend
      const orderData = {
        total_amount: grandTotal,
        total_tax_amount: fee,
        iduser: user.userId,
        order_tickets: eventTickets.map((ticket) => {
          // Log the ticket structure to verify its content
          console.log("Ticket:", ticket);

          return {
            ticket_status: "new",
            event_ticket: {
              connect: {
                idevent_ticket: ticket.idevent_ticket, // Use idevent_ticket instead of id
              },
            },
          };
        }),
        payments: [
          {
            idpayment_method: selectedPaymentMethod,
            payment_status: "completed",
          },
        ],
        data: new Date().toISOString(),
      };

      // Log the order data to the console for debugging
      console.log("Order Data being sent:", orderData);
      console.log("selectedPaymentMethod:", selectedPaymentMethod);

      // Send request to backend to create an order
      const response = await axios.post(
        "http://192.168.56.1:3000/api/orders/create",
        orderData
      );

      if (response.data.success) {
        Alert.alert(
          "Płatność potwierdzona",
          "Twoje zamówienie zostało złożone pomyślnie"
        );
        console.log("Navigating with userId:", user.userId);
        setSelectedEventData({selectedCategory,
          selectedPrice,
          quantity,
          selectedPaymentMethod,
          eventTickets,
          title,
          locationName,
          cityName,
          numberOfTickets,
          startDate,
          endDate,
          grandTotal,
          fee,
          isSeatCategorized,
          categoryType,});
          navigation.navigate("Shopping")
        // navigation.navigate("Shopping", {
        //   selectedCategory,
        //   selectedPrice,
        //   quantity,
        //   selectedPaymentMethod,
        //   eventTickets,
        //   title,
        //   locationName,
        //   cityName,
        //   numberOfTickets,
        //   startDate,
        //   endDate,
        //   grandTotal,
        //   fee,
        //   isSeatCategorized,
        //   categoryType,
        // });
      } else {
        Alert.alert("Błąd", "Wystąpił problem z przetworzeniem płatności");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      Alert.alert("Błąd", "Wystąpił problem z połączeniem z serwerem");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>Id user:{user.userEmail}</Text>

        <Text style={styles.category}>
          Kategoria: {getSelectedCategoryText()}
        </Text>
        <Text style={styles.price}>
          Cena za kategorię: {selectedPrice ? selectedPrice : "Brak ceny"} zł
        </Text>

        <View style={styles.separator} />

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityText}>Wybierz liczbę biletów:</Text>
          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            value={quantity === 0 ? "" : quantity.toString()} // Show empty field if quantity is 0
            onChangeText={(value) => {
              if (value === "") {
                // Allow clearing the input without resetting to 1
                setQuantity(0);
              } else {
                // Parse the input to an integer
                const newQuantity = parseInt(value, 10);

                if (!isNaN(newQuantity) && newQuantity > 0) {
                  if (newQuantity <= numberOfTickets) {
                    // If valid and within ticket limit, update quantity
                    setQuantity(newQuantity);
                  } else {
                    // If quantity exceeds limit, set to max and alert user
                    setQuantity(numberOfTickets);
                    Alert.alert(
                      "Przekroczona liczba biletów",
                      `Maksymalna liczba biletów to ${numberOfTickets}`
                    );
                  }
                } else {
                  // If input is invalid (non-positive number), reset to 1 and alert
                  Alert.alert(
                    "Niepoprawna liczba biletów",
                    "Liczba biletów musi być większa od 0."
                  );
                }
              }
            }}
            onBlur={() => {
              // If input is cleared or invalid after editing, reset to 1 on blur
              if (quantity === 0) {
                setQuantity(1);
              }
            }}
          />
        </View>

        <View style={styles.separator} />

        <View style={styles.eventDetailsContainer}>
          <Text style={styles.sectionTitle}>Szczegóły biletu:</Text>
          {Array.isArray(eventTickets) && eventTickets.length > 0 ? (
            eventTickets.map((ticket) => (
              <View
                key={ticket.idevent_ticket || ticket.name}
                style={styles.ticketDetails}
              >
                <Text style={styles.ticketDetailText}>
                  Nazwa: {ticket.name || "Brak nazwy"}
                </Text>
                <Text style={styles.ticketDetailText}>
                  Cena regularna:{" "}
                  {ticket.price ? ticket.price.toFixed(2) : "Brak ceny"} zł
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
          <Text style={styles.paymentMethodText}>
            Wybierz metodę płatności:
          </Text>
          {paymentMethods.length > 0 ? (
            <Picker
              selectedValue={selectedPaymentMethod}
              onValueChange={(itemValue) => setSelectedPaymentMethod(itemValue)}
            >
              {paymentMethods.length > 0 ? (
                paymentMethods.map((method, index) => (
                  <Picker.Item
                    key={method.idpayment_method || index} // Use idpayment_method for the key
                    label={method.name || "Brak nazwy"}
                    value={method.idpayment_method} // Use idpayment_method as the value
                  />
                ))
              ) : (
                <Text>Ładowanie metod płatności...</Text> // Show a loading state
              )}
            </Picker>
          ) : (
            <Text>Ładowanie metod płatności...</Text> // Show a loading state
          )}
        </View>

        <View style={styles.separator} />

        <View style={styles.feeContainer}>
          <Text style={styles.feeText}>Opłata serwisowa:</Text>
          <Text style={styles.feeAmount}>{fee} zł</Text>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Całkowita kwota:</Text>
          <Text style={styles.totalPrice}>
            {(grandTotal || 0).toFixed(2)} zł
          </Text>
        </View>

        <Pressable style={styles.payButton} onPress={confirmPayment}>
          <Text style={styles.payButtonText}>Potwierdź Płatność</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ConfirmationScreen;

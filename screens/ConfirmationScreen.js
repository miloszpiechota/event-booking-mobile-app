import React, { useEffect, useLayoutEffect, useState, useContext } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView, // Import ScrollView
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { UserContext } from "../UserContext";
import { SelectedEventContext } from "../SelectedEventContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./ConfiramtionScreen.styles";

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
  const saveSelectedEventData = async (data) => {
    try {
      await AsyncStorage.setItem('selectedEventData', JSON.stringify(data));
    } catch (error) {
      console.error("Error saving selected event data:", error);
    }
  };
  
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
  } = route.params;

  const fee = 87;
  const initialPrice =
    selectedPrice && !isNaN(parseFloat(selectedPrice))
      ? parseFloat(selectedPrice)
      : 0;

  const [quantity, setQuantity] = useState(1);
  const [grandTotal, setGrandTotal] = useState(initialPrice + fee);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { setSelectedEventData } = useContext(SelectedEventContext);

  useEffect(() => {
    const getPaymentMethods = async () => {
      const methods = await fetchPaymentMethods();
      setPaymentMethods(methods);
      if (methods.length > 0) {
        setSelectedPaymentMethod(methods[0].idpayment_method);
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

  const confirmPayment = async () => {
    try {
      const orderData = {
        total_amount: grandTotal,
        total_tax_amount: fee,
        iduser: user.userId,
        order_tickets: eventTickets.map((ticket) => ({
          ticket_status: "new",
          event_ticket: {
            connect: {
              idevent_ticket: ticket.idevent_ticket,
            },
          },
        })),
        payments: [
          {
            idpayment_method: selectedPaymentMethod,
            payment_status: "completed",
          },
        ],
        data: new Date().toISOString(),
      };

      const response = await axios.post(
        "http://192.168.56.1:3000/api/orders/create",
        orderData
      );

      if (response.data.success) {
        Alert.alert("Płatność potwierdzona", "Twoje zamówienie zostało złożone pomyślnie");
        setSelectedEventData({
          selectedCategory,
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
          categoryType,
        });
        
        saveSelectedEventData({
          selectedCategory,
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
          categoryType,
        });
        
        navigation.navigate("Shopping");
      } else {
        Alert.alert("Błąd", "Wystąpił problem z przetworzeniem płatności");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      Alert.alert("Błąd", "Wystąpił problem z połączeniem z serwerem");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.categoryText}>User: {user.userName}</Text>

        <Text style={styles.categoryText}>
          Kategoria: {getSelectedCategoryText()}
        </Text>
        <Text style={styles.priceText}>
          Cena za kategorię: {selectedPrice ? selectedPrice : "Brak ceny"} zł
        </Text>

        <View style={styles.separator} />

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Wybierz liczbę biletów:</Text>
          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            value={quantity === 0 ? "" : quantity.toString()}
            onChangeText={(value) => {
              if (value === "") {
                setQuantity(0);
              } else {
                const newQuantity = parseInt(value, 10);
                if (!isNaN(newQuantity) && newQuantity > 0) {
                  if (newQuantity <= numberOfTickets) {
                    setQuantity(newQuantity);
                  } else {
                    setQuantity(numberOfTickets);
                    Alert.alert("Przekroczona liczba biletów", `Maksymalna liczba biletów to ${numberOfTickets}`);
                  }
                } else {
                  Alert.alert("Niepoprawna liczba biletów", "Liczba biletów musi być większa od 0.");
                }
              }
            }}
            onBlur={() => {
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
              <View key={ticket.idevent_ticket || ticket.name} style={styles.ticketDetails}>
                <Text style={styles.ticketDetailText}>Nazwa: {ticket.name || "Brak nazwy"}</Text>
                <Text style={styles.ticketDetailText}>Cena: {ticket.price ? ticket.price.toFixed(2) : "Brak ceny"} zł</Text>
                <Text style={styles.ticketDetailText}>Start: {ticket.start_date ? new Date(ticket.start_date).toLocaleDateString() : "Brak daty"}</Text>
                <Text style={styles.ticketDetailText}>Koniec: {ticket.end_date ? new Date(ticket.end_date).toLocaleDateString() : "Brak daty"}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.ticketDetailText}>Brak szczegółów biletu.</Text>
          )}
        </View>

        <View style={styles.separator} />

        <View style={styles.paymentMethodContainer}>
          <Text style={styles.paymentMethodText}>Wybierz metodę płatności:</Text>
          {paymentMethods.length > 0 ? (
            <Picker
              selectedValue={selectedPaymentMethod}
              onValueChange={(itemValue) => setSelectedPaymentMethod(itemValue)}
            >
              {paymentMethods.map((method, index) => (
                <Picker.Item
                  key={method.idpayment_method || index}
                  label={method.name || "Brak nazwy"}
                  value={method.idpayment_method}
                />
              ))}
            </Picker>
          ) : (
            <Text>Ładowanie metod płatności...</Text>
          )}
        </View>

        <View style={styles.separator} />

        <View style={styles.feeContainer}>
          <Text style={styles.feeText}>Opłata serwisowa:</Text>
          <Text style={styles.feeAmount}>{fee} zł</Text>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Całkowita kwota:</Text>
          <Text style={styles.totalAmount}>{(grandTotal || 0).toFixed(2)} zł</Text>
        </View>

        <Pressable style={styles.payButton} onPress={confirmPayment}>
          <Text style={styles.payButtonText}>Potwierdź Płatność</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ConfirmationScreen;

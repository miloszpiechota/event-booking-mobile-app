import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { fetchOrderTickets } from "../database/FetchOrderTickets";
import OrderTicketCard from "../components/OrderTicketCard";

const ShopCartScreen = () => {
  const [orders, setOrders] = useState([]); // Stan dla zamówień
  const [loading, setLoading] = useState(true); // Stan ładowania danych
  const [error, setError] = useState(null); // Stan błędu

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const fetchedOrders = await fetchOrderTickets(); // Pobieranie zamówień
        setOrders(fetchedOrders || []); // Ustawienie zamówień w stanie
      } catch (err) {
        setError("Failed to load orders"); // Obsługa błędów
        console.error("Error loading orders:", err);
      } finally {
        setLoading(false); // Ustawienie loading na false po zakończeniu
      }
    };

    loadOrders(); // Wywołanie funkcji ładującej zamówienia
  }, []);

  if (loading) {
    return <Text>Loading...</Text>; // Komunikat ładowania
  }

  if (error) {
    return <Text>{error}</Text>; // Komunikat błędu
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Tickets</Text>
      <FlatList
        data={orders} // Przekazywanie danych do FlatList
        renderItem={({ item }) => (
          <OrderTicketCard order={item} /> // Przekazywanie każdego elementu do OrderTicketCard
        )}
        keyExtractor={(item) => item.idorder_ticket.toString()} // Klucz dla każdego elementu
        contentContainerStyle={{ paddingBottom: 100 }} // Dodanie paddingu na dole
      />
    </View>
  );
};

export default ShopCartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 50,
  },
});

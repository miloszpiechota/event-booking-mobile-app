import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { fetchOrders } from "../database/FetchOrders"; // Importujemy funkcję fetchOrders
import OrderTicketCard from "../components/OrderTicketCard"; // Importujemy komponent karty

const ShopCartScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Funkcja ładowania danych
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const fetchedOrders = await fetchOrders();
        console.log("Fetched Orders in ShopCartScreen:", fetchedOrders); // Dodajemy logowanie
        setOrders(fetchedOrders.data || []); // Upewniamy się, że przekazujemy tylko tablicę
      } catch (err) {
        setError("Failed to load orders");
        console.error("Error loading orders:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Orders</Text>

      <FlatList
        data={orders} // Teraz `orders` jest już tablicą
        renderItem={({ item }) => (
          <OrderTicketCard order={item} />
        )}
        keyExtractor={(item) => item.idorder.toString()} // Zwróć ID zamówienia jako unikalny klucz
        contentContainerStyle={{ paddingBottom: 100 }}
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
  },
});

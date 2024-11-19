import React, { useContext, useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SelectedEventContext } from "../SelectedEventContext";
import { UserContext } from "../UserContext";
import OrderTicketCard from "../components/OrderTicketCard";
import { fetchOrderTickets } from "../database/FetchOrderTickets";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ShopCartScreen = () => {
  const { user } = useContext(UserContext);
  const { selectedEventData, setSelectedEventData } = useContext(SelectedEventContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = async () => {
    try {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        throw new Error("User token is missing");
      }

      // Fetch orders using the token
      const fetchedOrders = await fetchOrderTickets(token);

      // Filter orders for the current user
      const userOrders = fetchedOrders.filter(order => order.user_id === user.userId);

      setOrders(userOrders);
    } catch (err) {
      setError("Failed to load orders");
      console.error("Error loading orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadSelectedEventData = async () => {
      try {
        const data = await AsyncStorage.getItem("selectedEventData");
        if (data) {
          setSelectedEventData(JSON.parse(data));
        }
      } catch (error) {
        console.error("Error loading selected event data:", error);
      }
    };

    loadSelectedEventData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      loadOrders();
    }, [user.userId])
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cześć, {user.userName}!{"\n"}Twoje bilety są dostępne tutaj:</Text>

      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <OrderTicketCard
            order={item}
            userName={user.userName}
            idorder_ticket={item.idorder_ticket} 
            {...selectedEventData}
          />
        )}
        keyExtractor={(item) => item.idorder_ticket.toString()}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default ShopCartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
    marginTop: 34,
  },
  greeting: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  contentContainer: {
    paddingBottom: 100,
  },
});

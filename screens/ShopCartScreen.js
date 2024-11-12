import React, { useContext, useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SelectedEventContext } from "../SelectedEventContext";
import { UserContext } from "../UserContext";
import OrderTicketCard from "../components/OrderTicketCard";
import { fetchOrderTickets } from "../database/FetchOrderTickets";
import { useFocusEffect } from "@react-navigation/native";

const ShopCartScreen = () => {
  const { user } = useContext(UserContext);
  const { selectedEventData } = useContext(SelectedEventContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = async () => {
    try {
      const fetchedOrders = await fetchOrderTickets();
      const userOrders = fetchedOrders.filter(order => order.user_id === user.userId);
      setOrders(userOrders);
    } catch (err) {
      setError("Failed to load orders");
      console.error("Error loading orders:", err);
    } finally {
      setLoading(false);
    }
  };

  // Use useFocusEffect to reload orders every time this screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true); // Show loading indicator while refreshing
      loadOrders();
    }, [user.userId])
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Tickets</Text>
      <Text style={styles.greeting}>Hello, {user.userName}</Text>
      
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <OrderTicketCard
            order={item}
            userName={user.userName}
            title={selectedEventData?.title}
            locationName={selectedEventData?.locationName}
            cityName={selectedEventData?.cityName}
            startDate={selectedEventData?.startDate}
            endDate={selectedEventData?.endDate}
            numberOfTickets={selectedEventData?.numberOfTickets}
            grandTotal={selectedEventData?.grandTotal}
            fee={selectedEventData?.fee}
            categoryType={selectedEventData?.categoryType}
          />
        )}
        keyExtractor={(item) => item.idorder_ticket.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
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
    marginBottom: 10,
    color: "#333",
  },
  greeting: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
});

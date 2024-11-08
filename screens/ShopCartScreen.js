import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { fetchOrderTickets } from "../database/FetchOrderTickets"; // Assuming this function fetches orders
import OrderTicketCard from "../components/OrderTicketCard"; // Assuming this is a card component to display order details
import { useRoute } from "@react-navigation/native";
import { UserContext } from "../UserContext";
const ShopCartScreen = () => {
  const route = useRoute(); // Get the route params
  //const { userId } = route.params;  // Destructure the userId from route params
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]); // State to hold orders
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to hold any errors

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const fetchedOrders = await fetchOrderTickets(); // Fetch orders from API or database
        console.log("Fetched Orders:", fetchedOrders);

        // Ensure userId is available before filtering
        if (user.userId) {
          const userOrders = fetchedOrders.filter(
            (order) => order.user_id === user.userId
          );
          console.log("Filtered Orders (userOrders):", userOrders); // Log filtered orders for debugging

          setOrders(userOrders); // Set filtered orders to state
        } else {
          setError("User ID is not available.");
        }
      } catch (err) {
        setError("Failed to load orders"); // Handle error if fetching fails
        console.error("Error loading orders:", err);
      } finally {
        setLoading(false); // Turn off loading after the fetch is complete
      }
    };

    loadOrders(); // Fetch orders when component mounts
  }, [user.userId]); // Re-fetch if userId changes
  // Re-fetch orders if userId changes

  if (loading) {
    return <Text>Loading...</Text>; // Display loading message while fetching
  }

  if (error) {
    return <Text>{error}</Text>; // Display error message if there's any issue
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Tickets</Text>
      <Text style={styles.header}>Hello, User {user.userId}</Text>

      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderTicketCard order={item} />} // Render each order using OrderTicketCard
        keyExtractor={(item) => item.idorder_ticket.toString()} // Use order's id for unique key
        contentContainerStyle={{ paddingBottom: 100 }} // Add padding at the bottom of the list
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

// ShopCartScreen.js
import React, { useContext, useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { fetchOrderTickets } from "../database/FetchOrderTickets";
import OrderTicketCard from "../components/OrderTicketCard";
import { UserContext } from '../UserContext';  // Import UserContext
import { useNavigation, useRoute } from "@react-navigation/native";

const ShopCartScreen = () => {
  const { user } = useContext(UserContext);  // Access user data from context
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const route = useRoute();  // Hook to access params passed via navigation
  const navigation = useNavigation();

  // Destructure params from route to get title, locationName, and cityName
  const { selectedCategory,
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
    categoryType
   } = route.params || {}; // Avoid error if route.params is undefined

  useEffect(() => {
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

    loadOrders();
  }, [user.userId]);

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
          title={title}            // Pass title as prop
          locationName={locationName}  // Pass locationName as prop
          cityName={cityName} 
          startDate={startDate}
          endDate={endDate}       
          numberOfTickets={numberOfTickets}  // Pass number of tickets
          grandTotal={grandTotal}  // Pass grand total
          fee={fee}  // Pass fee
          categoryType={categoryType}  // Pass category type
        />
        )}
        keyExtractor={(item) => item.idorder_ticket.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default ShopCartScreen;

// Styles for the component
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

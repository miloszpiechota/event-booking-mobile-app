import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OrderTicketCard = ({ order }) => {
  return (
    <View style={styles.card}>
      <Text>Ticket Name: {order.ticket_name}</Text>
      <Text>Start Date: {order.ticket_start_date}</Text>
      <Text>End Date: {order.ticket_end_date}</Text>
      <Text>Price: ${order.ticket_price}</Text>
      <Text>Status: {order.ticket_status}</Text>
      <Text>Order ID: {order.order_id}</Text>
      <Text>Order Date: {order.order_date}</Text>
      <Text>Total Amount: ${order.order_total_amount}</Text>
    </View>
  );
};

export default OrderTicketCard;

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
});

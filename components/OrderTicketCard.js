import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OrderTicketCard = ({ order }) => {
    return (
      <View style={styles.card}>
        <Text>Ticket Name: {order.ticket_name || 'N/A'}</Text>
        <Text>Start Date: {order.ticket_start_date ? new Date(order.ticket_start_date).toLocaleDateString() : 'N/A'}</Text>
        <Text>End Date: {order.ticket_end_date ? new Date(order.ticket_end_date).toLocaleDateString() : 'N/A'}</Text>
        <Text>Price: ${order.ticket_price || 'N/A'}</Text>
        <Text>Status: {order.ticket_status || 'N/A'}</Text>
        <Text>Order ID: {order.order_id || 'N/A'}</Text>
        <Text>Order Date: {order.order_date ? new Date(order.order_date).toLocaleDateString() : 'N/A'}</Text>
        <Text>Total Amount: ${order.order_total_amount || 'N/A'}</Text>
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
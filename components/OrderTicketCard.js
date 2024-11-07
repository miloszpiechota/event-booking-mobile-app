import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const OrderTicketCard = ({ order }) => {
  const {
    idorder,
    data,
    total_amount,
    total_tax_amount,
  } = order;

  return (
    <Pressable style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>Order ID: {idorder}</Text>
        <Text style={styles.details}>Date: {new Date(data).toLocaleDateString()}</Text>
        <Text style={styles.details}>Total Amount: ${total_amount}</Text>
        <Text style={styles.details}>Total Tax: ${total_tax_amount}</Text>
      </View>
    </Pressable>
  );
};

export default OrderTicketCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  cardContent: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
});

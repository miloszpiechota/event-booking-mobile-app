import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';

const ticketsData = [
  { id: '1', title: 'Concert Ticket', price: 50 },
  { id: '2', title: 'Movie Ticket', price: 15 },
  { id: '3', title: 'Theater Ticket', price: 30 },
  // Add more tickets as needed
];

const ShopCartScreen = () => {
  const renderTicketItem = ({ item }) => (
    <View style={styles.ticketItem}>
      <Text style={styles.ticketTitle}>{item.title}</Text>
      <Text style={styles.ticketPrice}>${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      <FlatList
        data={ticketsData}
        renderItem={renderTicketItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ShopCartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8', // Light background color for better visibility
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ticketItem: {
    backgroundColor: '#fff', // White background for each ticket item
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  ticketPrice: {
    fontSize: 16,
    color: '#888',
  },
});

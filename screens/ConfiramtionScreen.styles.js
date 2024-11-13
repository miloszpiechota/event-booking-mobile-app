import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  detailsContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 12,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginRight: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    width: 60,
    textAlign: "center",
  },
  eventDetailsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  ticketDetails: {
    marginBottom: 12,
  },
  ticketDetailText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  paymentMethodContainer: {
    marginTop: 20,
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    color: "#333",
  },
  feeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  feeText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  feeAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4a79d9",
  },
  payButton: {
    backgroundColor: "#4a79d9",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 25,
    alignItems: "center",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;

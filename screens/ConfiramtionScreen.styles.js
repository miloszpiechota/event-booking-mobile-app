// ConfirmationScreen.styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  detailsContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: "gray",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    width: 50,
    textAlign: "center",
  },
  paymentMethodContainer: {
    marginTop: 20,
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  feeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  feeText: {
    fontSize: 16,
    fontWeight: "500",
  },
  feeAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "500",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  payButton: {
    backgroundColor: "#4a79d9",
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 20,
    alignItems: "center",
  },
  payButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  eventDetailsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  ticketDetails: {
    marginBottom: 10,
  },
  ticketDetailText: {
    fontSize: 14,
    color: "gray",
  },
});

export default styles;

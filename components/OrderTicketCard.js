import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Modal, TouchableWithoutFeedback } from "react-native";
import QRCode from 'react-native-qrcode-svg';

const OrderTicketCard = ({ 
  order, 
  userName, 
  locationName, 
  cityName, 
  endDate, 
  startDate, 
  numberOfTickets, 
  grandTotal, 
  fee, 
  categoryType 
}) => {
  const [showQr, setShowQr] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const qrAnim = useState(new Animated.Value(0))[0];

  const toggleQr = () => {
    setShowQr(!showQr);
    Animated.timing(qrAnim, {
      toValue: showQr ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const qrSectionHeight = qrAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const calculateDaysLeft = (endDate) => {
    const currentDate = new Date();
    const end = new Date(endDate);
    const timeDifference = end - currentDate;
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysLeft;
  };

  const calculateEventDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end - start; // Difference in milliseconds
    const durationInDays = timeDifference / (1000 * 3600 * 24); // Convert to days
    return Math.ceil(durationInDays); // Round up to the next whole number
  };

  const daysLeft = calculateDaysLeft(endDate);
  const eventDuration = calculateEventDuration(startDate, endDate);
  
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // Generate a string to encode as the QR code (for example, using the order details)
  const qrData = `
    Ticket Name: ${order.ticket_name || "N/A"}
    Place: ${locationName || "N/A"} ${cityName || "N/A"}
    Ordered by: ${userName || "N/A"}
    Valid Until: ${endDate ? new Date(endDate).toLocaleString() : "N/A"}
    Days Left: ${daysLeft} days
    Tickets: ${numberOfTickets || "N/A"}
    Grand Total: ${grandTotal || "N/A"} zł
    Fee: ${fee || "N/A"}
    Category Type: ${categoryType || "N/A"}
  `;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.ticketInfo} onPress={openModal}>
          <Text style={styles.label}>NAZWA</Text>
          <Text style={styles.value}>{order.ticket_name || "N/A"}</Text>

          <Text style={styles.label}>DURATION</Text>
          <Text style={styles.value}>{eventDuration} days</Text>

          <Text style={styles.label}>PLACE</Text>
          <Text style={styles.value}>{locationName || "N/A"} {cityName || "N/A"}</Text>

          <Text style={styles.label}>ORDERED BY</Text>
          <Text style={styles.value}>
            {userName || "N/A"} on{" "}
            {order.order_date ? new Date(order.order_date).toLocaleString() : "N/A"}
          </Text>

          <Text style={styles.label}>VALID UNTIL</Text>
          <Text style={styles.value}>
            {endDate ? new Date(endDate).toLocaleString() : "N/A"}
          </Text>

          <Text style={styles.label}>DAYS LEFT</Text>
          <Text style={styles.value}>{daysLeft} days</Text>

          {/* Display additional data */}
          <Text style={styles.label}>No. of Tickets</Text>
          <Text style={styles.value}>{numberOfTickets || "N/A"}</Text>

          <Text style={styles.label}>Grand Total</Text>
          <Text style={styles.value}>{grandTotal || "N/A"} zł</Text>

          <Text style={styles.label}>Fee</Text>
          <Text style={styles.value}>{fee || "N/A"}</Text>

          <Text style={styles.label}>Category Type</Text>
          <Text style={styles.value}>{categoryType || "N/A"}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Pobierz bilet</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={toggleQr}>
              <Text style={styles.buttonText}>
                {showQr ? "Ukryj kod QR" : "Pokaż kod QR"}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <Animated.View style={[styles.qrSection, { height: qrSectionHeight }]}>
          {showQr && (
            <QRCode
              value={qrData} // The QR code will encode the `qrData` string
              size={150} // Adjust the size of the QR code
              color="black" // Color of the QR code
              backgroundColor="white" // Background color of the QR code
            />
          )}
        </Animated.View>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Szczegóły biletu</Text>
                <Text style={styles.modalText}>NAZWA: {order.ticket_name || "N/A"}</Text>
                <Text style={styles.modalText}>PLACE: {locationName || "N/A"} {cityName || "N/A"}</Text>
                <Text style={styles.modalText}>ORDERED BY: {userName || "N/A"}</Text>
                <Text style={styles.modalText}>VALID UNTIL: {endDate ? new Date(endDate).toLocaleString() : "N/A"}</Text>
                <Text style={styles.modalText}>DAYS LEFT: {daysLeft} days</Text>

                {/* Additional modal information */}
                <Text style={styles.modalText}>No. of Tickets: {numberOfTickets || "N/A"}</Text>
                <Text style={styles.modalText}>Grand Total: {grandTotal || "N/A"} zł</Text>
                <Text style={styles.modalText}>Fee: {fee || "N/A"} zł</Text>
                <Text style={styles.modalText}>Category Type: {categoryType || "N/A"}</Text>

                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.buttonText}>Zamknij</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </View>
  );
};

export default OrderTicketCard;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 15,
    backgroundColor: "#abc2ff",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  ticketInfo: {
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 12,
    color: "#888",
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#333",
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  qrSection: {
    alignItems: "center",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
  },
});

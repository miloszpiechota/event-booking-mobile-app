import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import ViewShot from "react-native-view-shot"; // Import ViewShot

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
  const viewShotRef = useRef(null);

  const openModal = () => {
    setModalVisible(true);
  };
  
  const closeModal = () => {
    setModalVisible(false);
  };
  
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
    const timeDifference = end - start;
    const durationInDays = timeDifference / (1000 * 3600 * 24);
    return Math.ceil(durationInDays);
  };

  const daysLeft = calculateDaysLeft(endDate);
  const eventDuration = calculateEventDuration(startDate, endDate);

  const qrData = JSON.stringify({
    ticketName: order.ticket_name || "N/A",
    place: `${locationName || "N/A"} ${cityName || "N/A"}`,
    orderedBy: userName || "N/A",
    validUntil: endDate ? new Date(endDate).toLocaleString() : "N/A",
    daysLeft: daysLeft,
    tickets: numberOfTickets || "N/A",
    grandTotal: grandTotal || "N/A",
    fee: fee || "N/A",
    categoryType: categoryType || "N/A",
  });

  const generatePdf = async () => {
    try {
      const uri = await viewShotRef.current.capture(); // Capture the view
      const htmlContent = `
        <h1>Ticket Details</h1>
        <p><b>Ticket Name:</b> ${order.ticket_name || "N/A"}</p>
        <p><b>Duration:</b> ${eventDuration} days</p>
        <p><b>Place:</b> ${locationName || "N/A"} ${cityName || "N/A"}</p>
        <p><b>Ordered By:</b> ${userName || "N/A"}</p>
        <p><b>Valid Until:</b> ${endDate ? new Date(endDate).toLocaleString() : "N/A"}</p>
        <p><b>Days Left:</b> ${daysLeft} days</p>
        <p><b>No. of Tickets:</b> ${numberOfTickets || "N/A"}</p>
        <p><b>Grand Total:</b> ${grandTotal || "N/A"} zł</p>
        <p><b>Fee:</b> ${fee || "N/A"} zł</p>
        <p><b>Category Type:</b> ${categoryType || "N/A"}</p>
        <div style="text-align: center; margin-top: 20px;">
          <img src="${uri}" width="150" height="150" />
        </div>
      `;

      const options = {
        html: htmlContent,
        fileName: 'ticket',
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert("PDF Generated", `File saved at: ${file.filePath}`);
    } catch (error) {
      Alert.alert("Error", "Failed to generate PDF.");
    }
  };

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

          <Text style={styles.label}>No. of Tickets</Text>
          <Text style={styles.value}>{numberOfTickets || "N/A"}</Text>

          <Text style={styles.label}>Grand Total</Text>
          <Text style={styles.value}>{grandTotal || "N/A"} zł</Text>

          <Text style={styles.label}>Fee</Text>
          <Text style={styles.value}>{fee || "N/A"}</Text>

          <Text style={styles.label}>Category Type</Text>
          <Text style={styles.value}>{categoryType || "N/A"}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={generatePdf}>
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
            <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
              <QRCode value={qrData} size={150} color="black" backgroundColor="white" />
            </ViewShot>
          )}
        </Animated.View>

        {/* Modal and additional code */}
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

import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import ViewShot from "react-native-view-shot";
import styles from "./OrderTicketCard.styles";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { PermissionsAndroid, Platform } from 'react-native';

const OrderTicketCard = ({ 
  order, 
  userName, 
  locationName = "N/A", 
  cityName = "N/A", 
  endDate = "N/A", 
  startDate = "N/A", 
  numberOfTickets = "N/A", 
  grandTotal = "N/A", 
  fee = "N/A", 
  categoryType = "N/A" 
}) => {
  const [showQr, setShowQr] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const qrAnim = useState(new Animated.Value(0))[0];
  const viewShotRef = useRef(null);

  

const requestAndroidPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);
    return (
      granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
    );
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const generatePdf = async () => {
  if (Platform.OS === 'android') {
    const hasPermission = await requestAndroidPermissions();
    if (!hasPermission) {
      Alert.alert('Brak uprawnień', 'Aplikacja potrzebuje uprawnień do zapisu plików.');
      return;
    }
  }

  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>Informacje o Bilecie</h1>
        <table>
          <tr><th>Nazwa Biletu</th><td>${order.ticket_name || 'N/A'}</td></tr>
          <tr><th>Miejsce</th><td>${locationName} ${cityName}</td></tr>
          <tr><th>Zamówione przez</th><td>${userName}</td></tr>
          <tr><th>Ważne do</th><td>${endDate !== 'N/A' ? new Date(endDate).toLocaleString() : 'N/A'}</td></tr>
          <tr><th>Dni pozostałe</th><td>${daysLeft} dni</td></tr>
          <tr><th>Liczba biletów</th><td>${numberOfTickets}</td></tr>
          <tr><th>Łączna kwota</th><td>${grandTotal} zł</td></tr>
          <tr><th>Opłata</th><td>${fee}</td></tr>
          <tr><th>Kategoria</th><td>${categoryType}</td></tr>
        </table>
      </body>
    </html>
  `;

  try {
    const options = {
      html: htmlContent,
      fileName: `bilet_${order.idorder_ticket}`,
      directory: 'Documents',
    };

    const file = await RNHTMLtoPDF.convert(options);
    Alert.alert('PDF wygenerowany', `Plik zapisany w: ${file.filePath}`);
  } catch (error) {
    Alert.alert('Błąd', 'Nie udało się wygenerować PDF');
    console.error(error);
  }
};

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

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
    return Math.ceil((end - currentDate) / (1000 * 3600 * 24));
  };

  const calculateEventDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end - start) / (1000 * 3600 * 24));
  };

  const daysLeft = endDate !== "N/A" ? calculateDaysLeft(endDate) : "N/A";
  const eventDuration = (startDate !== "N/A" && endDate !== "N/A") 
    ? calculateEventDuration(startDate, endDate) 
    : "N/A";

  const qrData = JSON.stringify({
    ticketName: order.ticket_name || "N/A",
    place: `${locationName} ${cityName}`,
    orderedBy: userName || "N/A",
    validUntil: endDate !== "N/A" ? new Date(endDate).toLocaleString() : "N/A",
    daysLeft,
    tickets: numberOfTickets,
    grandTotal,
    fee,
    categoryType,
  });

  

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.ticketInfo} onPress={openModal}>
          <Text style={styles.label}>NAZWA</Text>
          <Text style={styles.value}>{order.ticket_name || "N/A"}</Text>

          <Text style={styles.label}>DURATION</Text>
          <Text style={styles.value}>{eventDuration} days</Text>

          <Text style={styles.label}>PLACE</Text>
          <Text style={styles.value}>{locationName} {cityName}</Text>

          <Text style={styles.label}>ORDERED BY</Text>
          <Text style={styles.value}>{userName} on {order.order_date ? new Date(order.order_date).toLocaleString() : "N/A"}</Text>

          <Text style={styles.label}>VALID UNTIL</Text>
          <Text style={styles.value}>{endDate !== "N/A" ? new Date(endDate).toLocaleString() : "N/A"}</Text>

          <Text style={styles.label}>DAYS LEFT</Text>
          <Text style={styles.value}>{daysLeft} days</Text>

          <Text style={styles.label}>No. of Tickets</Text>
          <Text style={styles.value}>{numberOfTickets}</Text>

          <Text style={styles.label}>Grand Total</Text>
          <Text style={styles.value}>{grandTotal} zł</Text>

          <Text style={styles.label}>Fee</Text>
          <Text style={styles.value}>{fee}</Text>

          <Text style={styles.label}>Category Type</Text>
          <Text style={styles.value}>{categoryType}</Text>

          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => generatePdf(order, locationName, cityName, userName, endDate, numberOfTickets, grandTotal, fee, categoryType)}>
              <Text style={styles.buttonText}>Pobierz bilet PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={toggleQr}>
              <Text style={styles.buttonText}>{showQr ? "Ukryj kod QR" : "Pokaż kod QR"}</Text>
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

        <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={closeModal}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Szczegóły biletu</Text>
                <Text style={styles.modalText}>NAZWA: {order.ticket_name || "N/A"}</Text>
                <Text style={styles.modalText}>PLACE: {locationName} {cityName}</Text>
                <Text style={styles.modalText}>ORDERED BY: {userName || "N/A"}</Text>
                <Text style={styles.modalText}>VALID UNTIL: {endDate !== "N/A" ? new Date(endDate).toLocaleString() : "N/A"}</Text>
                <Text style={styles.modalText}>DAYS LEFT: {daysLeft} days</Text>
                <Text style={styles.modalText}>No. of Tickets: {numberOfTickets}</Text>
                <Text style={styles.modalText}>Grand Total: {grandTotal} zł</Text>
                <Text style={styles.modalText}>Fee: {fee}</Text>
                <Text style={styles.modalText}>Category Type: {categoryType}</Text>
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

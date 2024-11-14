import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, Modal, TouchableWithoutFeedback, Alert, Platform } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import ViewShot from "react-native-view-shot";
import * as FileSystem from 'expo-file-system';
import * as Print from "expo-print";
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import styles from "./OrderTicketCard.styles";

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
  const qrAnim = useRef(new Animated.Value(0)).current;
  const viewShotRef = useRef(null);
  const qrCodeRef = useRef(null); // Dodano referencję do ukrytego ViewShot

  const formatDate = (date) => date !== "N/A" ? new Date(date).toLocaleDateString("en-GB") : "N/A";
  const calculateDaysLeft = (end) => end !== "N/A" ? Math.ceil((new Date(end) - new Date()) / (1000 * 3600 * 24)) : "N/A";

  const toggleQr = () => {
    setShowQr(!showQr);
    Animated.timing(qrAnim, { toValue: showQr ? 0 : 1, duration: 300, useNativeDriver: false }).start();
  };

  const generatePdf = async () => {
    try {
      // Uchwycenie obrazu kodu QR
      const qrImageUri = await qrCodeRef.current.capture();
      // Odczytanie obrazu jako base64
      const qrImageBase64 = await FileSystem.readAsStringAsync(qrImageUri, { encoding: FileSystem.EncodingType.Base64 });

      // Tworzenie treści HTML z obrazem kodu QR
      const htmlContent = `
        <html>
          <body>
            <h1>Order Details</h1>
            <p><strong>NAZWA:</strong> ${order.ticket_name || "N/A"}</p>
            <p><strong>DURATION:</strong> ${calculateDaysLeft(startDate)} days</p>
            <p><strong>PLACE:</strong> ${locationName}, ${cityName}</p>
            <p><strong>ORDERED BY:</strong> ${userName} on ${order.order_date ? formatDate(order.order_date) : "N/A"}</p>
            <p><strong>VALID UNTIL:</strong> ${formatDate(endDate)}</p>
            <p><strong>DAYS LEFT:</strong> ${calculateDaysLeft(endDate)} days</p>
            <img src="data:image/png;base64,${qrImageBase64}" style="width:150px;height:150px;"/>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      if (Platform.OS === "android") {
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
          const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
          await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, "OrderDetails.pdf", "application/pdf")
            .then(async (uri) => {
              await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
              Alert.alert("Sukces", "Plik PDF został zapisany pomyślnie.");
            })
            .catch(e => {
              console.log(e);
              Alert.alert("Błąd", "Wystąpił problem podczas zapisywania pliku PDF.");
            });
        } else {
          await Sharing.shareAsync(uri);
          Alert.alert("Sukces", "Plik PDF został wygenerowany i jest gotowy do udostępnienia.");
        }
      } else if (Platform.OS === "ios") {
        await Sharing.shareAsync(uri)
          .then(() => {
            Alert.alert("Sukces", "Plik PDF został wygenerowany i udostępniony pomyślnie.");
          })
          .catch(e => {
            console.log(e);
            Alert.alert("Błąd", "Wystąpił problem podczas udostępniania pliku PDF.");
          });
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Błąd", "Wystąpił problem podczas generowania pliku PDF.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.ticketInfo} onPress={() => setModalVisible(true)}>
          <Text style={styles.label}>NAZWA</Text>
          <Text style={styles.value}>{order.ticket_name || "N/A"}</Text>

          <Text style={styles.label}>DURATION</Text>
          <Text style={styles.value}>{calculateDaysLeft(startDate)} days</Text>

          <Text style={styles.label}>PLACE</Text>
          <Text style={styles.value}>{locationName}, {cityName}</Text>

          <Text style={styles.label}>ORDERED BY</Text>
          <Text style={styles.value}>{userName} on {order.order_date ? formatDate(order.order_date) : "N/A"}</Text>

          <Text style={styles.label}>VALID UNTIL</Text>
          <Text style={styles.value}>{formatDate(endDate)}</Text>

          <Text style={styles.label}>DAYS LEFT</Text>
          <Text style={styles.value}>{calculateDaysLeft(endDate)} days</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={generatePdf}>
              <Text style={styles.buttonText}>Pobierz PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleQr}>
              <Text style={styles.buttonText}>{showQr ? "Ukryj kod QR" : "Pokaż kod QR"}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <Animated.View style={[styles.qrSection, { height: qrAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 200] }) }]}>
          {showQr && (
            <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
              <QRCode value={`${order.ticket_name || 'N/A'}`} size={150} color="black" backgroundColor="white" />
            </ViewShot>
          )}
        </Animated.View>

        {/* Ukryty ViewShot do przechwytywania kodu QR dla PDF */}
        <View style={{ position: 'absolute', top: -9999, left: -9999 }}>
          <ViewShot ref={qrCodeRef} options={{ format: "png", quality: 1 }}>
            <QRCode value={`${order.ticket_name || 'N/A'}`} size={150} color="black" backgroundColor="white" />
          </ViewShot>
        </View>

        <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Szczegóły biletu</Text>
                <Text style={styles.modalText}>NAZWA: {order.ticket_name || "N/A"}</Text>
                <Text style={styles.modalText}>Miejsce: {locationName}, {cityName}</Text>
                <Text style={styles.modalText}>Zamówione przez: {userName || "N/A"}</Text>
                <Text style={styles.modalText}>Ważne do: {formatDate(endDate)}</Text>
                <Text style={styles.modalText}>Dni pozostałe: {calculateDaysLeft(endDate)} days</Text>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
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

import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Button, Alert, TouchableOpacity } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { fetchOrderTickets } from "../database/FetchOrderTickets";
import { UserContext } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import { API_BASE_URL } from "@env";

const QrScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [orders, setOrders] = useState([]); // Wszystkie zamówienia
  const [orderData, setOrderData] = useState(null); // Znalezione zamówienie
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    const loadOrders = async () => {
      try {
        // Use fetchOrderTickets with the user's token
        const fetchedOrders = await fetchOrderTickets(user.token);
        setOrders(fetchedOrders); // Set all orders
      } catch (err) {
        console.error("Error loading orders:", err);
        Alert.alert("Error", "Unable to load orders. Please try again later.");
      }
    };

    getCameraPermissions();
    loadOrders();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);

    try {
      const parsedData = JSON.parse(data);
      console.log("Skanowane dane QR:", parsedData);

      if (parsedData.idorder_ticket) {
        const matchedOrder = orders.find(
          (order) => order.idorder_ticket === parsedData.idorder_ticket
        );

        if (matchedOrder) {
          console.log("Znalezione zamówienie:", matchedOrder);
          setOrderData(matchedOrder);
        } else {
          console.log("Nie znaleziono zamówienia dla ID:", parsedData.idorder_ticket);
          Alert.alert("Nie znaleziono", "Zamówienie nie istnieje w bazie danych.");
        }
      } else {
        console.log("Kod QR nie zawiera prawidłowego ID zamówienia:", parsedData);
        Alert.alert("Błąd", "Kod nie zawiera prawidłowego ID zamówienia.");
      }
    } catch (error) {
      console.error("Error processing barcode data:", error);
      Alert.alert("Błąd", "Wystąpił problem podczas przetwarzania danych kodu.");
    }
  };

  const handleTicketValidation = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/order_tickets/update/${orderData.idorder_ticket}`, {
        method: "PUT", // Użyj PATCH lub PUT w zależności od API
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ ticket_status: "ticket validated" }), 
      });

      if (!response.ok) {
        throw new Error("Failed to update ticket status");
      }

      const result = await response.json();
      console.log("Zaktualizowany bilet:", result);

      Alert.alert("Sukces", "Bilet został skasowany");
      navigation.navigate("Home", {
        screen: "HomeScreen",
      });
    } catch (error) {
      console.error("Error updating ticket status:", error);
      Alert.alert("Błąd", "Nie udało się zaktualizować statusu biletu.");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"], // Obsługiwane typy kodów
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Scan Again"} onPress={() => setScanned(false)} />
      )}
      {orderData && (
        <View style={styles.orderDetails}>
          <Text style={styles.header}>Szczegóły Zamówienia:</Text>
          <Text>ID Zamówienia: {orderData.idorder_ticket}</Text>
          <Text>Nazwa Biletu: {orderData.ticket_name}</Text>
          <Text>Cena: {orderData.ticket_price} PLN</Text>
          <Text>Data Zamówienia: {orderData.order_date}</Text>

          <TouchableOpacity style={styles.validateButton} onPress={handleTicketValidation}>
            <Text style={styles.validateButtonText}>Wstęp upoważniony</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default QrScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  orderDetails: {
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginTop: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  validateButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "green",
    borderRadius: 8,
    alignItems: "center",
  },
  validateButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { fetchOrderTickets } from "../database/FetchOrderTickets";
import { UserContext } from "../UserContext";

const QrScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [orders, setOrders] = useState([]); // Wszystkie zamówienia
  const [orderData, setOrderData] = useState(null); // Znalezione zamówienie
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    const loadOrders = async () => {
      try {
        const fetchedOrders = await fetchOrderTickets();
        setOrders(fetchedOrders); // Ustaw wszystkie zamówienia bez filtrowania
      } catch (err) {
        console.error("Error loading orders:", err);
        Alert.alert("Błąd", "Nie udało się załadować zamówień.");
      }
    };

    getCameraPermissions();
    loadOrders();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);

    try {
      const parsedData = JSON.parse(data); // Zakładamy, że QR zawiera dane w formacie JSON
      console.log("Skanowane dane QR:", parsedData);

      if (parsedData.idorder_ticket) {
        // Szukaj zamówienia o `idorder_ticket` w `orders`
        const matchedOrder = orders.find((order) => {
          console.log("Porównanie wartości:", {
            orderId: order.idorder_ticket,
            scannedId: parsedData.idorder_ticket,
          });
          return order.idorder_ticket === parsedData.idorder_ticket;
        });

        if (matchedOrder) {
          console.log("Znalezione zamówienie:", matchedOrder);
          setOrderData(matchedOrder); // Zapisz dane zamówienia
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
});

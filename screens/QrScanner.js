import React, { useState, useEffect } from "react";
import { View, Text, Alert, Button, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
 
const QrScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  console.log("Camera Component:", Camera);
  useEffect(() => {
    console.log("Requesting camera permissions...");
    const getCameraPermissions = async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
 // Corrected to requestCameraPermissionsAsync method
        console.log("Camera permission status:", status);
        setHasPermission(status === "granted");
      } catch (error) {
        console.error("Error while requesting camera permissions:", error);
      }
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    console.log("Barcode scanned:", { type, data });
    setScanned(true);
    try {
      const decodedData = JSON.parse(data); // Assuming QR code contains JSON
      console.log("Decoded data:", decodedData);
      setOrderDetails(decodedData);
      Alert.alert("Success", "QR code scanned successfully!");
    } catch (error) {
      console.error("Error parsing QR code data:", error);
      Alert.alert("Error", "Invalid data format in QR code.");
    }
  };

  if (hasPermission === null) {
    console.log("Camera permission status is null, requesting...");
    return <Text style={styles.message}>Requesting for camera permission...</Text>;
  }

  if (hasPermission === false) {
    console.warn("No access to camera");
    return <Text style={styles.message}>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarcodeScanned}
        style={styles.camera}
      />
      {scanned && (
        <Button title="Scan Again" onPress={() => {
          console.log("Resetting scanned state...");
          setScanned(false);
        }} />
      )}
      {orderDetails && (
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Order Details:</Text>
          <Text style={styles.value}>Name: {orderDetails.orderName}</Text>
          <Text style={styles.value}>Location: {orderDetails.locationName}, {orderDetails.cityName}</Text>
          <Text style={styles.value}>Category: {orderDetails.categoryType}</Text>
          <Text style={styles.value}>Number of Tickets: {orderDetails.numberOfTickets}</Text>
          <Text style={styles.value}>Total Price: {orderDetails.grandTotal} zł</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
  },
  value: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default QrScanner;

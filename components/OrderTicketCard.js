import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from "react-native";

const OrderTicketCard = ({ order }) => {
  // Stan do kontroli animacji i widoczności QR
  const [showQr, setShowQr] = useState(false);
  const qrAnim = useState(new Animated.Value(0))[0]; // Animowana wartość do kontroli wysokości QR

  // Funkcja do przełączania widoczności kodu QR
  const toggleQr = () => {
    setShowQr(!showQr);
    Animated.timing(qrAnim, {
      toValue: showQr ? 0 : 1, // Jeśli QR jest pokazane, schowaj, w przeciwnym razie pokaż
      duration: 300, // Czas trwania animacji
      useNativeDriver: false,
    }).start();
  };

  // Obliczamy wysokość animowanej sekcji z kodem QR
  const qrSectionHeight = qrAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200], // Wysokość sekcji z QR, gdy jest ukryta i pokazana
  });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Dolna część biletu z informacjami */}
        <View style={styles.ticketInfo}>
          <Text style={styles.label}>NAZWA</Text>
          <Text style={styles.value}>{order.ticket_name || "N/A"}</Text>

          <Text style={styles.label}>PLACE</Text>
          <Text style={styles.value}>{order.place || "N/A"}</Text>

          <Text style={styles.label}>ORDERED BY</Text>
          <Text style={styles.value}>
            {order.ordered_by || "N/A"} on{" "}
            {order.order_date ? new Date(order.order_date).toLocaleString() : "N/A"}
          </Text>

          <Text style={styles.label}>VALID UNTIL</Text>
          <Text style={styles.value}>
            {order.valid_until ? new Date(order.valid_until).toLocaleString() : "N/A"}
          </Text>

          {/* Przyciski obok siebie */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Pobierz bilet</Text>
            </TouchableOpacity>

            {/* Przycisk do pokazania kodu QR */}
            <TouchableOpacity style={styles.button} onPress={toggleQr}>
              <Text style={styles.buttonText}>
                {showQr ? "Ukryj kod QR" : "Pokaż kod QR"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sekcja z kodem QR z animacją */}
        <Animated.View style={[styles.qrSection, { height: qrSectionHeight }]}>
          <Image
            source={{ uri: "https://example.com/qr-code-image.png" }}
            style={styles.qrCode}
          />
        </Animated.View>
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
    flexDirection: "row", // Układ poziomy
    justifyContent: "space-between", // Rozmieszcza przyciski na całej szerokości
    marginTop: 15,
  },
  button: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
    flex: 1, // Umożliwia, żeby przyciski miały równą szerokość
    marginHorizontal: 5, // Odstęp między przyciskami
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center", // Centrowanie tekstu w przycisku
  },
  qrSection: {
    alignItems: "center",
    backgroundColor: "#fff",
    overflow: "hidden", // Zapewnia, że QR kod nie wyjdzie poza sekcję
  },
  qrCode: {
    width: 150,
    height: 150,
  },
});

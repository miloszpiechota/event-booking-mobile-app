import {
    Alert,
    BackHandler,
    Pressable,
    StyleSheet,
    Text,
    View,
  } from "react-native";
  import React, { useEffect, useLayoutEffect } from "react";
  import { useNavigation, useRoute } from "@react-navigation/native";
  
  const ConfirmationScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
  
    // Przekazywane parametry
    const {
      title,
      selectedCategory,
      selectedPrice,
    } = route.params;
  
    const fee = 87; // Przykładowa opłata serwisowa
    const grandTotal = parseFloat(selectedPrice) + fee; // Całkowita kwota do zapłaty
  
    useLayoutEffect(() => {
      navigation.setOptions({
        gestureEnabled: false,
        gestureDirection: "horizontal",
      });
    }, []);
  
    useEffect(() => {
      const backAction = () => {
        Alert.alert(
          "Chcesz zakończyć sesję?",
          "Powrócić do głównego ekranu?",
          [
            {
              text: "Anuluj",
              onPress: () => console.log("Anulowano"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () =>
                navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] }),
            },
          ],
          { cancelable: false }
        );
  
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
  
        return () => backHandler.remove();
      };
    }, []);
  
    const confirmPayment = () => {
      Alert.alert(
        "Potwierdzenie",
        `Całkowita kwota do zapłaty: ${grandTotal} zł`,
        [
          {
            text: "Anuluj",
            onPress: () => console.log("Płatność anulowana"),
            style: "cancel",
          },
          {
            text: "Potwierdź",
            onPress: () => {
              // Logika po potwierdzeniu płatności
              console.log("Płatność potwierdzona");
              navigation.navigate("Ticket", {
                selectedCategory,
                selectedPrice,
              });
            },
          },
        ]
      );
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.category}>Kategoria: {selectedCategory}</Text>
          <Text style={styles.price}>Cena: {selectedPrice} zł</Text>
  
          <View style={styles.separator} />
  
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Całkowita kwota do zapłaty:</Text>
            <Text style={styles.totalPrice}>{grandTotal} zł</Text>
          </View>
  
          <View style={styles.feeContainer}>
            <Text style={styles.feeText}>Opłata serwisowa:</Text>
            <Text style={styles.feeAmount}>{fee} zł</Text>
          </View>
  
          <Pressable
            onPress={confirmPayment}
            style={styles.payButton}
          >
            <Text style={styles.payButtonText}>POTWIERDŹ PŁATNOŚĆ</Text>
          </Pressable>
        </View>
      </View>
    );
  };
  
  export default ConfirmationScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f5f5f5",
    },
    detailsContainer: {
      backgroundColor: "white",
      padding: 10,
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
    payButton: {
      marginTop: 20,
      backgroundColor: "#4fceeb",
      padding: 10,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
    },
    payButtonText: {
      fontSize: 15,
      fontWeight: "bold",
      color: "#f9f9f9",
    },
  });
  
import React, { useState } from "react"; 
import { useNavigation, useRoute } from "@react-navigation/native"; 
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from "react-native";

const SeatCategoryScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  
  const { 
    eventTickets,
    title,
    photo,
    description,
    locationName,
    cityName,
    startDate,
    endDate,
    isSeatCategorized,
    categoryType,
    ...restProps 
  } = route.params;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(0);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    let ticketPrice = 0;
    switch (category) {
      case "firstCategory":
        ticketPrice = eventTickets[0]?.price * 3.0;
        break;
      case "secondCategory":
        ticketPrice = eventTickets[0]?.price * 2.0;
        break;
      case "thirdCategory":
        ticketPrice = eventTickets[0]?.price;
        break;
      default:
        ticketPrice = 0;
    }
    setSelectedPrice(ticketPrice.toFixed(2));
  };

  const getSelectedCategoryText = () => {
    switch (selectedCategory) {
      case "firstCategory":
        return "Pierwsza Kategoria";
      case "secondCategory":
        return "Druga Kategoria";
      case "thirdCategory":
        return "Trzecia Kategoria";
      default:
        return "Brak wybranej kategorii";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Wybierz kategorię miejsc:</Text>
      <Text style={styles.selectedCategoryText}>Wybrano: {getSelectedCategoryText()}</Text>
      
      <View style={styles.stageContainer}>
        <View style={styles.stageBox}>
          <Text style={styles.stageText}>SCENA</Text>
        </View>

        <View style={styles.categoryContainer}>
          <TouchableOpacity 
            style={[
              styles.categoryBox, 
              styles.firstCategory, 
              selectedCategory === "firstCategory" && styles.selectedCategory
            ]} 
            onPress={() => handleCategoryPress("firstCategory")}
          >
            <Text style={styles.categoryText}>Pierwsza Kategoria</Text>
            <Text style={styles.priceText}>
              Cena: { (eventTickets[0]?.price * 3.0).toFixed(2) } zł
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.categoryBox, 
              styles.secondCategory, 
              selectedCategory === "secondCategory" && styles.selectedCategory
            ]} 
            onPress={() => handleCategoryPress("secondCategory")}
          >
            <Text style={styles.categoryText}>Druga Kategoria</Text>
            <Text style={styles.priceText}>
              Cena: { (eventTickets[0]?.price * 2.0).toFixed(2) } zł
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.categoryBox, 
              styles.thirdCategory, 
              selectedCategory === "thirdCategory" && styles.selectedCategory
            ]} 
            onPress={() => handleCategoryPress("thirdCategory")}
          >
            <Text style={styles.categoryText}>Trzecia Kategoria</Text>
            <Text style={styles.priceText}>
              Cena: { (eventTickets[0]?.price).toFixed(2) } zł
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {selectedCategory && (
        <Pressable 
          style={styles.button} 
          onPress={() =>
            navigation.navigate("Confirmation", {
              title,
              photo,
              description,
              locationName,
              cityName,
              startDate,
              endDate,
              isSeatCategorized,
              categoryType,
              selectedCategory,
              selectedPrice,
              eventTickets,
              ...restProps,
            })
          }
        >
          <Text style={styles.buttonText}>DALEJ</Text>
        </Pressable>
      )}
    </View>
  );
};

export default SeatCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  selectedCategoryText: {
    fontSize: 18,
    color: "#555",
    marginVertical: 10,
  },
  stageContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#e6e6e6",
    marginVertical: 20,
  },
  stageBox: {
    width: '80%',
    height: 60,
    backgroundColor: '#99a3b2',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  stageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  categoryContainer: {
    width: '100%',
  },
  categoryBox: {
    width: '100%',
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    paddingHorizontal: 15,
  },
  firstCategory: {
    backgroundColor: '#bbdefb',
  },
  secondCategory: {
    backgroundColor: '#bbdefb',
  },
  thirdCategory: {
    backgroundColor: '#bbdefb',
  },
  selectedCategory: {
    borderColor: "#D98859",
    borderWidth: 2,
    backgroundColor: "#ffd9b3",
  },
  categoryText: {
    fontSize: 20,
    fontWeight: '600',
    color: "#333",
  },
  priceText: {
    fontSize: 16,
    fontWeight: '500',
    color: "#666",
    marginTop: 8,
  },
  button: {
    backgroundColor: "#4a79d9",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    width: '80%',
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

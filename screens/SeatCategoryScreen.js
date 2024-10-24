import React, { useState } from "react"; 
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from "react-native";

const SeatCategoryScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  
  const {
    title,
    photo,
    description,
    locationName,
    cityName,
    startDate,
    endDate,
    isSeatCategorized,
    price,
    categoryType,
  } = route.params;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(0);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category); // Ustawia wybraną kategorię
    switch (category) {
      case "firstCategory":
        setSelectedPrice((price * 3.0).toFixed(2)); // Ustawia cenę dla pierwszej kategorii
        break;
      case "secondCategory":
        setSelectedPrice((price * 2.0).toFixed(2)); // Ustawia cenę dla drugiej kategorii
        break;
      case "thirdCategory":
        setSelectedPrice((price * 1.0).toFixed(2)); // Ustawia cenę dla trzeciej kategorii
        break;
      default:
        setSelectedPrice(0);
    }
    console.log("Wybrana kategoria:", category);
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
      <Text style={styles.priceText}>Wybierz kategorie miejsc:</Text>
      <Text style={styles.priceText}>Wybrano: {getSelectedCategoryText()}</Text>
      
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
              Cena: { (price * 3.0).toFixed(2) } zł
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
              Cena: { (price * 2.0).toFixed(2) } zł
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
              Cena: { (price * 1.0).toFixed(2) } zł
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
              price,
              categoryType,
              selectedCategory,  // Przekazanie wybranej kategorii
              selectedPrice,      // Przekazanie wybranej ceny
            })
          }
        >
          <Text style={styles.buttonText}>NEXT</Text>
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
  },
  stageContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#6e6b6b',
    borderRadius: 10,
    padding: 10,
  },
  stageBox: {
    width: '80%',
    height: 60,
    backgroundColor: '#7d7d7d',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
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
    marginBottom: 10,
    borderRadius: 8,
  },
  firstCategory: {
    backgroundColor: '#e6afeb',
  },
  secondCategory: {
    backgroundColor: '#f6c1a6',
  },
  thirdCategory: {
    backgroundColor: 'hsl(190, 65%, 89%)',
  },
  selectedCategory: {
    backgroundColor: 'green', 
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: "#FF6F61",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
    marginTop: 20,
    width: '80%',
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

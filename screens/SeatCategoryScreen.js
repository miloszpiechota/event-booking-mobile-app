import React, { useState } from "react"; 
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from "react-native";

const SeatCategoryScreen = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Dodano użycie navigation
  const {
    title,
    photo,
    description,
    locationName,
    cityName,
    startDate,
    endDate,
    
    categoryType,
  } = route.params; // Receiving the passed data
  // Odbieranie przekazanych danych z route.params
  const { isSeatCategorized, price } = route.params;

  // Stan do przechowywania aktualnie wybranej kategorii
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Logowanie do konsoli, aby upewnić się, że dane są poprawnie odebrane
  console.log("isSeatCategorized:", isSeatCategorized);
  console.log("Price:", price);

  // Funkcja do obsługi kliknięcia w kategorię
  const handleCategoryPress = (category) => {
    setSelectedCategory(category); // Ustawia wybraną kategorię
    console.log("Wybrana kategoria:", category);
  };

  // Funkcja do uzyskania tekstu w zależności od wybranej kategorii
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
      {/* Wyświetlanie wybranej kategorii */}
      <Text style={styles.priceText}>Wybrano: {getSelectedCategoryText()}</Text>
      
      {/* Duży prostokąt reprezentujący scenę */}
      <View style={styles.stageContainer}>
        {/* Mniejszy prostokąt reprezentujący scenę */}
        <View style={styles.stageBox}>
          <Text style={styles.stageText}>SCENA</Text>
        </View>

        {/* Prostokąty reprezentujące kategorie miejsc */}
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

      {/* Przycisk NEXT - widoczny tylko po wybraniu kategorii */}
      {selectedCategory && (
        <Pressable 
          style={styles.button} 
          onPress={() =>
            navigation.navigate(
               "Confirmation",
              {
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
              }
            )
          }// Zaktualizowano na odpowiedni ekran
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
    backgroundColor: "#FF6F61", // Kolor przycisku
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
    marginTop: 20, // Margines górny dla odstępu
    width: '80%', // Szerokość przycisku
  },
  buttonText: {
    color: "#fff", // Kolor tekstu
    fontSize: 18,
    fontWeight: "bold",
  },
});

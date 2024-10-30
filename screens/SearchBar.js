import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Events..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.input} // Apply styles
      />
      <AntDesign name="search1" size={20} color="black" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Ustawienie kierunku na wiersz
    alignItems: 'center',  // Wyrównanie do środka w osi Y
    backgroundColor: '#f9f9f9', // Kolor tła
    borderRadius: 80, // Zaokrąglone rogi
    marginBottom: 10, // Odstęp dolny
    paddingHorizontal: 10, // Odstęp wewnętrzny
    marginTop:10,
  },
  input: {
    flex: 1, // Wypełnienie dostępnej przestrzeni
    height: 40, // Wysokość pola
    borderColor: 'gray', // Kolor obramowania
    borderWidth: 1, // Grubość obramowania
    borderRadius: 80, // Zaokrąglone rogi
    paddingHorizontal: 40, // Odstęp wewnętrzny, by zostawić miejsce dla ikony
    paddingVertical: 10, // Dodanie odrobinę przestrzeni w pionie
  },
  icon: {
    position: 'absolute', // Umożliwienie umiejscowienia ikony w miejscu
    left: 20, // Odstęp od lewej krawędzi
  },
});

export default SearchBar;

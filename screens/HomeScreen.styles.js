import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterButton: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'rgba(217, 136, 89, 0.736)', // Lekko przezroczysty kolor
    width: 60,
    height: 60,
    borderRadius: 30,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    height: 280,
    backgroundColor: 'white',
  },
  categoryText: {
    paddingVertical: 5,
    fontSize: 15,
    fontWeight: '500',
    marginTop: 10,
  },
  categoryButton: (selected) => ({
    margin: 10,
    borderColor: selected ? 'orange' : '#CBCBCB',
    borderWidth: 1,
    paddingVertical: 5,
    borderRadius: 25,
    paddingHorizontal: 11,
    backgroundColor: selected ? 'orange' : 'white',
  }),
  categoryButtonText: (selected) => ({
    color: selected ? 'white' : 'black',
    fontWeight: selected ? '500' : 'normal',
  }),
  headerStyle: {
    backgroundColor: "#f5f5f5",
    shadowColor: "transparent",
    shadowOpacity: 0.3,
    shadowOffset: { width: -1, height: 1 },
    shadowRadius: 3,
  },
  modalStyle: {
    justifyContent: "flex-end",
    margin: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Slight transparency
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10, // Odstęp od FlatList
  },
  
});

export default styles;

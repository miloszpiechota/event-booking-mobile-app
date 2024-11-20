import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cityName: {
    fontSize: 16,
    fontWeight: "600",
    color: "red",
  },
  filterButton: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'rgba(210, 149, 27, 0.8)', // Lekko przezroczysty kolor
    width: 60,
    height: 60,
    borderRadius: 30,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  listContentContainer: {
    paddingBottom: 100,
  },
  modalContent: {
    width: "100%",
    height: 280,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  modalStyle: {
    justifyContent: "flex-end",
    margin: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  categoryButton: (selected) => ({
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: selected ? "#FFA726" : "#CBCBCB",
    backgroundColor: selected ? "#FFA726" : "#fff",
    margin: 5,
  }),
  categoryButtonText: (selected) => ({
    color: selected ? "#fff" : "#333",
    fontWeight: selected ? "600" : "normal",
  }),
});

export default styles;

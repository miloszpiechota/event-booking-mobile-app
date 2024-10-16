import { StyleSheet } from "react-native";
export const ec_s = StyleSheet.create({
  card: {
    backgroundColor: "white",
    height: 140, // Zwiększona wysokość, aby zmieścić dodatkowe informacje
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 13,
    flexDirection: "row", // Rozmieszczenie dzieci w wierszu
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 15,
  },
  img_left: {
    width: "50%", // Obraz zajmuje połowę szerokości karty
    height: "100%", // Cała wysokość karty
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
  },
  info_right: {
    width: "50%", // Sekcja tekstu zajmuje drugą połowę karty
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  eventName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventDates: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  eventLocation: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  bookButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "flex-end",
  },
  bookButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

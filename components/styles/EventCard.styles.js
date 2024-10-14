import { StyleSheet } from "react-native";

export const ec_s = StyleSheet.create({
  card: {
    backgroundColor: "white",
    height: 115,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 13,
    flexDirection: "row", // Arrange children in a row
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 15,
  },
  img_left: {
    width: "50%", // Image takes up half of the card's width
    height: "100%", // Occupy the full height of the card
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
  },
  info_right: {
    width: "50%", // Text section takes up the other half of the card
    paddingHorizontal: 10,
    justifyContent: "center",
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

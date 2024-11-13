import { StyleSheet } from "react-native";

export const ec_s = StyleSheet.create({
  card: {
    backgroundColor: "white",
    height: 150,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 15,
    marginTop: 5,
  },
  img_left: {
    width: "48%", // Slightly less than half for balanced spacing
    height: "100%",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  info_right: {
    width: "52%", // Ensures alignment and balance with img_left
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  eventName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#333",
  },
  eventDates: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
  eventLocation: {
    fontSize: 14,
    color: "#888",
    marginTop: 3,
  },
  bookButton: {
    backgroundColor: "#4A79D9",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  bookButtonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 14,
  },
});

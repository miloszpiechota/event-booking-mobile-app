import { StyleSheet } from "react-native";

export const ec_s = StyleSheet.create({
  card: {
    backgroundColor: "white",
    height: 180, // Increase the height for a larger card
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    overflow: "hidden",
  },
  img_left: {
    width: "50%", // Slightly reduce image width to give more space to text
    height: "100%",
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
  },
  info_right: {
    width: "55%", // Slightly increase the right side for text content
    paddingHorizontal: 15,
    justifyContent: "space-between", // Space out the content vertically
    paddingVertical: 10,
  },
  eventName: {
    fontSize: 18, // Increase font size for better readability
    fontWeight: "bold",
    color: "#333",
  },
  eventDates: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: "#4A79D9",
    paddingHorizontal: 10, // Reduced padding to avoid cutting off text
    borderRadius: 8,
    width: "80%", // Button width relative to the container
    height: 35, // Fixed height as required
    alignSelf: "center",
    justifyContent: "center", // Center the text vertically within the fixed height
    alignItems: "center", // Center the text horizontally
    marginTop: 10, // Optional: Adds spacing above the button
  },
  
  bookButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});


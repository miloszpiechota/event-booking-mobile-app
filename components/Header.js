import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={{ marginBottom: 55 }}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/backgroundImage.jpg")}
      >
        {/* Dark overlay for dimmed effect */}
        <View style={styles.overlay} />

        {/* Text on dimmed background */}
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Explore Events Near You!</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  backgroundImage: {
    height: 200,
    resizeMode: "cover", // Keep "cover" for a better effect
    justifyContent: "center", // Vertical alignment of text
    alignItems: "center", // Horizontal alignment of text
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire ImageBackground
    backgroundColor: 'rgba(0, 0.4, 0.4, 0.45)', // Semi-transparent black for dim effect
  },
  textContainer: {
    padding: 10,
  },
  headerText: {
    fontSize: 33,           // Larger font size for emphasis
    color: "white",         // White color for contrast
    fontWeight: "400",      // Lighter font weight for thinner appearance
    textAlign: "center",    // Centered text
    letterSpacing: 1,       // Slight letter spacing for elegance
    
    
    
  },
  
});

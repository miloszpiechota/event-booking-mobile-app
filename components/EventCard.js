import { StyleSheet, Text, View, SafeAreaView, Pressable, Image } from "react-native";
import React from "react";
import { ec_s } from "./styles/EventCard.styles";

const EventCard = ({ item }) => {
  return (
    <SafeAreaView>
      <Pressable style={ec_s.card}>
        <Image
         style={ec_s.img_left}
         source={{ uri: item.photo }} // Load image from assets folder
        />
        <View style={ec_s.info_right}>
          <Text>{item.name}</Text>
          <Pressable style={ec_s.bookButton} onPress={() => console.log('Book button pressed!')}>
            <Text style={ec_s.bookButtonText}>Book</Text>
          </Pressable>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default EventCard;

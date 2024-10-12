import { StyleSheet, Text, View, SafeAreaView, Pressable, Image } from "react-native";
import React from "react";
import { ec_s } from "./styles/EventCard.styles";
const EventCard = ({ item }) => {
  return (
    <SafeAreaView>
      <Pressable style={ec_s.card}>
        <Image
          style={ec_s.img_left}
          source={require("../assets/backgroundImage.jpg")} // Load image from assets folder
        />
        <View style={ec_s.info_right}>
          <Text>{item.title}</Text>
          
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default EventCard;

const styles = StyleSheet.create({});

import {  StyleSheet, Text, View, SafeAreaView, Pressable, Image } from "react-native";
import React from "react";
import { ec_s } from "./styles/EventCard.styles";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Miesiące są indeksowane od 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}-${month}-${year} ${hours}:${minutes}`;
};


const EventCard = ({ item }) => {
  return (
    <SafeAreaView>
      <Pressable style={ec_s.card}>
        <Image
          style={ec_s.img_left}
          source={{ uri: item.photo }} 
        />
        <View style={ec_s.info_right}>
          <Text style={ec_s.eventName}>{item.name}</Text>
          <Text style={ec_s.eventDates}>
            {formatDate(item.start_date)} - {formatDate(item.end_date)}
          </Text>
          <Text style={ec_s.eventLocation}>
            Location: {item.fk_idevent_location}
          </Text>
          <Pressable style={ec_s.bookButton} onPress={() => console.log('Book button pressed!')}>
            <Text style={ec_s.bookButtonText}>Book</Text>
          </Pressable>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default EventCard;

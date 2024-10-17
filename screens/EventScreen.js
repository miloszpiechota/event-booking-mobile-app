import { ScrollView, StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React,{useState, useLayoutEffect} from 'react'
import {useNavigation, useRoute} from "@react-navigation/native"
import {
  ImageBackground,
  Pressable,
} from "react-native";

import { events } from "../assets/data/events";
const EventScreen = ({ item }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const [selectedDate,setSelectedDate] = useState();
    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle:route.params.title,
        headerStyle: {
            backgroundColor: "#F5F5F5",
            showColor:"transparent",
            shadowOpacity:0.3,
            shadowOffset:{width:-1,height:1},
            shadowRadius:3,
        },

      });
    
      
    }, []);
  return (
    <SafeAreaView>
    <View style={{marginBottom:55}}>
      <ImageBackground
        style={{ height: 200, resizeMode: "container" }}
        source={require("../assets/backgroundImage.jpg")}
      >  
      </ImageBackground>


    </View>
    </SafeAreaView>
  )
}

export default EventScreen;

const styles = StyleSheet.create({});
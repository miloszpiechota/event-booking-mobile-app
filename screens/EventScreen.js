import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React,{useState, useLayoutEffect} from 'react'
import {useNavigation, useRoute} from "@react-navigation/native"

const EventScreen = () => {
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
    <View>
        
      <Text>
        Event
      </Text>
    </View>
  )
}

export default EventScreen;

const styles = StyleSheet.create({});
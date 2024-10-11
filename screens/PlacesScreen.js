import { Pressable, StyleSheet, Text, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useLayoutEffect, useRef, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Place } from "../PlacesContext";
const PlacesScreen = () => {
    //const navigation = useNavigation();

    // useLayoutEffect(() => {
    //   navigation.setOptions({
    //     headerTitle:()=>(
    //         <Pressable style={{flexDirection:"row",alignItems:"center",gap:4}}>
    //             <AntDesign name="arrowleft" size={24} color="black" />
    //             <Text style={{fontSize: 15,letterSpacing:1}}>CHANGE LOCATION</Text>

    //         </Pressable>
    //     )
    //   })
    
      
    // }, [])

    const {selectedCity,setSelectedCity} = useContext(Place)
  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  )
}
export default PlacesScreen
const styles = StyleSheet.create({})
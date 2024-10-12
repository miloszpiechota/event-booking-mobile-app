import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { events } from "../assets/data/events";
const Header = () => {
  return (
    <View>
      <ImageBackground style={{height: 200, resizeMode: "container"}}
      source={require('../assets/backgroundImage.jpg')}/>
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({})
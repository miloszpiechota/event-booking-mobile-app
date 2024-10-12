import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { events } from "../assets/data/events";
const Header = () => {
  return (
    <View style={{marginBottom:55}}>
      <ImageBackground
        style={{ height: 200, resizeMode: "container" }}
        source={require("../assets/backgroundImage.jpg")}
      >
        <Pressable
          style={{
            height: 110,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
            width: "90%",
            top: 140,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <View style={{flexDirection: "row",alignItems:"center",justifyContent:"space-between"}}>
            <View>
            <Text style={{ fontSize: 20, color: "#007bff", fontWeight: "600" }}>Releasing in 1 Day</Text>
            <Text style={{marginVertical:5,fontSize:16,fontWeight:"700"}}>Title 1</Text>
            <Text style={{fontSize:15,color:"gray",fontWeight:500}}>Title 2</Text>
            </View>
            <Pressable style={{backgroundColor:"#ffc40c",padding:10,borderRadius:6,marginRight: 10}}>
                <Text>BOOK</Text>
            </Pressable>
          </View>
        </Pressable>
      </ImageBackground>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});

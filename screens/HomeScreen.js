import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
} from "react-native";
import React, { useLayoutEffect, useRef, useContext } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Place } from "../PlacesContext";
import { events } from "../assets/data/events";
import MovieCard from "../components/EventCard";
import Header from "../components/Header";
const HomeScreen = () => {
  const navigation = useNavigation();
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const { selectedCity } = useContext(Place); //added

  useFocusEffect(
    React.useCallback(() => {
      opacityAnim.setValue(0);
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }, [opacityAnim])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Text>Hello Miłosz</Text>,
      headerStyle: {
        backgroundColor: "#f5f5f5",
        shadowColor: "transparent",
        shadowOpacity: 0.3,
        shadowOffset: { width: -1, height: 1 },
        shadowRadius: 3,
      },
      headerRight: () => (
        <Pressable
          style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />
          <EvilIcons
            onPress={() => navigation.navigate("Places")}
            name="location"
            size={24}
            color="black"
          />

          <Pressable onPress={() => navigation.navigate("Places")}>
            <Animated.Text style={{ opacity: opacityAnim }}>
              <Text>{selectedCity ? selectedCity.name : "Lublin"}</Text>
            </Animated.Text>
          </Pressable>
        </Pressable>
      ),
    });
  }, [navigation, opacityAnim, selectedCity]);

  return (
    <View>
      <FlatList
        ListHeaderComponent={Header}
        data={events}
        renderItem={({ item, index }) => <MovieCard item={item} key={index} />}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

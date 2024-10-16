import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
} from "react-native";
import React, { useLayoutEffect, useRef, useContext, useState, useEffect } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Place } from "../PlacesContext";
import MovieCard from "../components/EventCard";
import Header from "../components/Header";
import { BottomModal, ModalFooter, ModalTitle, ModalContent } from "react-native-modals";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SlideAnimation } from "react-native-modals";
import { supabase } from '../database/superbaseClient.ts'; // Import your Supabase client

const HomeScreen = () => {
  const navigation = useNavigation();
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const { selectedCity } = useContext(Place);
  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState([]); // State to store events
  const [categories, setCategories] = useState([]); // State to store categories
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('event')
        .select(`
          *,
          event_locations (
            name,
            fk_idcity (
              city
            )
          )
        `);
  
      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data);
      }
    };

    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('event_category')
        .select('*'); // Fetch all categories

      if (error) {
        console.error('Error fetching categories:', error);
      } else {
        setCategories(data);
      }
    };

    fetchEvents();
    fetchCategories();
  }, []); // Pobieranie danych przy montowaniu komponentu
  

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
        <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
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
      renderItem={({ item, index }) => (
        <MovieCard
          item={{
            ...item,
            location_name: item.event_locations ? item.event_locations.name : "Unknown Location",  // Przekazywanie nazwy lokalizacji
            city_name: item.event_locations?.fk_idcity?.city || "Unknown City"  // Przekazywanie nazwy miasta
          }}
          key={index}
        />
      )}
    />
      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={{
          position: "absolute",
          bottom: 10,
          backgroundColor: "#3facab",
          width: 60,
          height: 60,
          borderRadius: 30,
          right: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FontAwesome name="filter" size={24} color="black" />
      </Pressable>

      <BottomModal
        onBackDropPress={() => setModalVisible(!modalVisible)}
        setDirection={["up", "down"]}
        swipeThreshold={200}
        footer={
          <ModalFooter>
            <Pressable
              style={{
                paddinRight: 10,
                marginLeft: "auto",
                marginRight: "auto",
                marginVertical: 10,
                marginBottom: 30,
              }}
            >
              <Text>Apply</Text>
            </Pressable>
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Filters" />}
        modalAnimation={new SlideAnimation({ slideForm: "bottom" })}
        visible={modalVisible}
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
         <ModalContent style={{ width: "100%", height: 280 }}>
          <Text
            style={{
              paddingVertical: 5,
              fontSize: 15,
              fontWeight: "500",
              marginTop: 10,
            }}
          >
            Event Category
          </Text>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <Text key={index} style={{ paddingVertical: 5 }}>
                {category.category_type} {/* Wyświetlanie kategorii */}
              </Text>
            ))
          ) : (
            <Text>No categories available</Text> // Komunikat, jeśli brak kategorii
          )}
        </ModalContent>
      </BottomModal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

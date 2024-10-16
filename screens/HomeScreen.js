import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
} from "react-native";
import React, {
  useLayoutEffect,
  useRef,
  useContext,
  useState,
  useEffect,
} from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Place } from "../PlacesContext";
import MovieCard from "../components/EventCard";
import Header from "../components/Header";
import {
  BottomModal,
  ModalFooter,
  ModalTitle,
  ModalContent,
} from "react-native-modals";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SlideAnimation } from "react-native-modals";
import { supabase } from "../database/superbaseClient.ts"; // Import your Supabase client

const HomeScreen = () => {
  const navigation = useNavigation();
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const { selectedCity } = useContext(Place);
  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState([]); // State to store events
  const [categories, setCategories] = useState([]); // State to store categories
  const [selectedCategory, setSelectedCategory] = useState(); // State for filter

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("event").select(`
          *,
          event_locations (
            name,
            fk_idcity (
              city
            )
          )
        `);

      if (error) {
        console.error("Error fetching events:", error);
      } else {
        setEvents(data);
      }
    };

    const fetchCategories = async () => {
      const { data, error } = await supabase.from("event_category").select("*"); // Fetch all categories

      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data);
      }
    };

    fetchEvents();
    fetchCategories();
  }, []); // Fetch data on component mount

  // Filtering function based on selected category
  const applyFilter = (filter) => {
    switch (filter) {
      case "Koncert":
        return events.filter(event => event.fk_idevent_category === 1); // Assuming 1 is the id for concerts
      case "Festiwal":
        return events.filter(event => event.fk_idevent_category === 2); // Assuming 2 is the id for festivals
      case "Wystawa":
        return events.filter(event => event.fk_idevent_category === 3); // Assuming 3 is the id for exhibitions
      case "Maraton":
        return events.filter(event => event.fk_idevent_category === 4); // Assuming 4 is the id for marathons
      case "Konferencja":
        return events.filter(event => event.fk_idevent_category === 5); // Assuming 5 is the id for conferences
      case "Warsztaty":
        return events.filter(event => event.fk_idevent_category === 6); // Assuming 6 is the id for workshops
      case "Zawody":
        return events.filter(event => event.fk_idevent_category === 7); // Assuming 7 is the id for competitions
      case "Festyn":
        return events.filter(event => event.fk_idevent_category === 10); // Assuming 10 is the id for fairs
      default:
        return events; // If no filter is selected, return all events
    }
  };

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
        data={applyFilter(selectedCategory)} // Apply filter based on selected category
        renderItem={({ item, index }) => (
          <MovieCard
            item={{
              ...item,
              location_name: item.event_locations
                ? item.event_locations.name
                : "Unknown Location",
              city_name:
                item.event_locations?.fk_idcity?.city || "Unknown City",
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
              onPress={() => setModalVisible(false)} // Close modal on apply
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

          <Pressable style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
            {categories.length > 0 ? (
              categories.map((category) => (
                <Pressable
                  key={category.id}
                  style={{
                    margin: 10,
                    borderColor: selectedCategory === category.category_type ? 'orange' : '#CBCBCB',
                    borderWidth: 1,
                    paddingVertical: 5,
                    borderRadius: 25,
                    paddingHorizontal: 11,
                    backgroundColor: selectedCategory === category.category_type ? 'orange' : 'white',
                  }}
                  onPress={() => {
                    // Logic for clicking
                    if (selectedCategory === category.category_type) {
                      setSelectedCategory(null); // Reset selection
                    } else {
                      setSelectedCategory(category.category_type); // Set selected category
                    }
                    console.log(`Selected category: ${category.category_type}`);
                  }}
                >
                  <Text
                    style={{
                      color: selectedCategory === category.category_type ? 'white' : 'black',
                      fontWeight: selectedCategory === category.category_type ? '500' : 'normal',
                    }}
                  >
                    {category.category_type}
                  </Text>
                </Pressable>
              ))
            ) : (
              <Text>No categories available</Text>
            )}
          </Pressable>
        </ModalContent>
      </BottomModal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

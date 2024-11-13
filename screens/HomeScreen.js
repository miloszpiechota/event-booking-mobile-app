import {
  Pressable,
  View,
  Animated,
  FlatList,
  Text,
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
import EventCard from "../components/EventCard";
import Header from "../components/Header";
import {
  BottomModal,
  ModalContent,
} from "react-native-modals";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SlideAnimation } from "react-native-modals";
import { fetchEvents } from "../database/FetchEvents";
import { fetchCategories } from "../database/FetchCategories";
import { fetchLocations } from "../database/FetchLocations";
import { fetchEventTickets } from "../database/FetchEventTickets";
import styles from "./HomeScreen.styles";
import SearchBar from "./SearchBar";

const HomeScreen = () => {
  const navigation = useNavigation();
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const { selectedCity } = useContext(Place); // Access selected city from PlaceContext
  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedEvents = await fetchEvents();
        const fetchedCategories = await fetchCategories();
        const fetchedLocations = await fetchLocations();
        const fetchedTickets = await fetchEventTickets();

        // Map event tickets to each event based on idevent
        const eventsWithTickets = fetchedEvents.map((event) => {
          const tickets = fetchedTickets.filter(ticket => ticket.idevent === event.idevent);
          const category = fetchedCategories.find(cat => cat.idevent_category === event.idevent_category);
          const location = fetchedLocations.find(loc => loc.id === event.idevent_location);

          return {
            ...event,
            eventTickets: tickets,
            categoryType: category ? category.category_type : "Unknown",
            location_name: location ? location.name : "Unknown Location",
            city_name: location ? location.city : "Unknown City",
            country_name: location ? location.country : "Unknown Country",
          };
        });

        setEvents(eventsWithTickets);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  // Function to apply category filter
  const applyCategoryFilter = (eventsList) => {
    if (!selectedCategory || selectedCategory === "All") {
      return eventsList;
    }

    const categoryMapping = categories.reduce((acc, category) => {
      acc[category.category_type] = category.idevent_category;
      return acc;
    }, {});

    const categoryId = categoryMapping[selectedCategory];
    return eventsList.filter(event => event.idevent_category === categoryId);
  };

  // Filter events based on selected city, search query, and category
  const filterEvents = () => {
    let filteredEvents = events;

    if (selectedCity?.name) {
      filteredEvents = filteredEvents.filter(event => event.city_name === selectedCity.name);
    }

    if (searchQuery) {
      filteredEvents = filteredEvents.filter(event => 
        (event.title || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
        (event.description || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return applyCategoryFilter(filteredEvents);
  };

  const filteredEvents = filterEvents();

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
      headerStyle: styles.headerStyle,
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
    <>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={Header}
          data={filteredEvents} 
          renderItem={({ item, index }) => (
            <EventCard
              item={{
                ...item,
                location_name: item.location_name,
                city_name: item.city_name,
                country_name: item.country_name,
                photo: item.photo,
                description: item.description,
                isSeatCategorized: item.is_seat_categorized,
                categoryType: item.categoryType,
                eventTickets: item.eventTickets,
                numberOfTickets: item.number_of_ticket,
              }}
              key={index}
            />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
        <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.filterButton}>
          <FontAwesome name="filter" size={24} color="black" />
        </Pressable>

        {/* Modal filtering interface */}
        <BottomModal
          onBackDropPress={() => setModalVisible(!modalVisible)}
          swipeDirection={["up", "down"]}
          swipeThreshold={200}
          modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
          visible={modalVisible}
          onHardwareBackPress={() => setModalVisible(!modalVisible)}
          onTouchOutside={() => setModalVisible(!modalVisible)}
          style={styles.modalStyle}
        >
          <ModalContent style={styles.modalContent}>
            <Text style={styles.categoryText}>Event Category</Text>
            <Pressable style={styles.filterContainer}>
              <Pressable
                style={styles.categoryButton(selectedCategory === "All")}
                onPress={() => setSelectedCategory(selectedCategory === "All" ? null : "All")}
              >
                <Text style={styles.categoryButtonText(selectedCategory === "All")}>All</Text>
              </Pressable>

              {categories.length > 0 ? (
                categories.map((category) => (
                  <Pressable
                    key={category.idevent_category}
                    style={styles.categoryButton(selectedCategory === category.category_type)}
                    onPress={() => setSelectedCategory(
                      selectedCategory === category.category_type ? null : category.category_type
                    )}
                  >
                    <Text style={styles.categoryButtonText(selectedCategory === category.category_type)}>
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
    </>
  );
};

export default HomeScreen;

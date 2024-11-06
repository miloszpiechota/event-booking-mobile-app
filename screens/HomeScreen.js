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
import { fetchEvents } from "../database/FetchEvents"; // Import the fetchEvents function
import { fetchCategories } from "../database/FetchCategories"; // Import the fetchCategories function
import styles from './HomeScreen.styles'; // Import styles
import SearchBar from "./SearchBar";
import { fetchLocations } from '../database/FetchLocations'; 
import { fetchEventTickets } from '../database/FetchEventTickets';

const HomeScreen = () => {
  const navigation = useNavigation();
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const { selectedCity } = useContext(Place);
  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState([]); // State to store events
  const [categories, setCategories] = useState([]); // State to store categories
  const [selectedCategory, setSelectedCategory] = useState(); // State for filter
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch all required data
        const fetchedEvents = await fetchEvents();
        const fetchedCategories = await fetchCategories();
        const fetchedLocations = await fetchLocations();
        const fetchedTickets = await fetchEventTickets();
  
        // Map event tickets to each event based on idevent
        const eventsWithTickets = fetchedEvents.map((event) => {
          const tickets = fetchedTickets.filter(ticket => {
            console.log(`Comparing ticket.idevent: ${ticket.idevent} with event.idevent: ${event.idevent}`);
            return ticket.idevent === event.idevent;
        });
        
          console.log("\x1b[31m%s\x1b[0m", "Event Tickets for event:", event.name, tickets.length ? tickets : "No tickets found");

          // Retrieve category and location names
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
  
        // Set the data in state
        setEvents(eventsWithTickets);
        setCategories(fetchedCategories);
        setLocations(fetchedLocations);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
  
    loadData();
  }, []);
  

  // Filtering function based on selected category
  const applyFilter = (filter) => {
    if (!filter || filter === "All") {
      return events; // Return all events if filter is "All" or not set
    }

    // Create a mapping of category_type to idevent_category
    const categoryMapping = categories.reduce((acc, category) => {
      acc[category.category_type] = category.idevent_category; // Map category_type to idevent_category
      return acc;
    }, {});

    const categoryId = categoryMapping[filter]; // Get the category ID based on the selected filter

    // Filter events based on the category ID
    return events.filter(event => event.idevent_category === categoryId); // Use idevent_category for filtering
  };

  // Function to filter events based on search query
  const filterEvents = (events) => {
    if (!searchQuery) return events; // If no search query, return all events
    return events.filter(event => {
      const title = event.title || ""; // Default to empty string if title is undefined
      const description = event.description || ""; // Default to empty string if description is undefined
      return (
        title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  // Combined filter logic
  const filteredEvents = filterEvents(applyFilter(selectedCategory)); // Combine filters

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
      headerStyle: styles.headerStyle, // Use imported styles
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
    
    <>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={Header}
          data={filteredEvents} // Use the combined filtered events
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
              numberOfTickets: item.number_of_ticket

              }}
              key={index}
            />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={styles.filterButton}
        >
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
          style={styles.modalStyle} // Use imported styles
        >
          <ModalContent style={styles.modalContent}>
            <Text style={styles.categoryText}>Event Category</Text>
            <Pressable style={styles.filterContainer}>
              <Pressable
                style={styles.categoryButton(selectedCategory === "All")}
                onPress={() =>
                  setSelectedCategory(selectedCategory === "All" ? null : "All")
                }
              >
                <Text style={styles.categoryButtonText(selectedCategory === "All")}>
                  All
                </Text>
              </Pressable>

              {categories.length > 0 ? (
                categories.map((category) => (
                  <Pressable
                    key={category.idevent_category}
                    style={styles.categoryButton(selectedCategory === category.category_type)}
                    onPress={() =>
                      setSelectedCategory(
                        selectedCategory === category.category_type
                          ? null
                          : category.category_type
                      )
                    }
                  >
                    <Text style={styles.categoryButtonText(selectedCategory === category.category_type)}>
                      {category.category_type}
                    </Text>
                  </Pressable>
                ))
              ) : (
                <Text>No categories available</Text> // Ensure this is wrapped in <Text>
              )}
            </Pressable>
          </ModalContent>
        </BottomModal>
      </View>
    </>
  );
};

export default HomeScreen;

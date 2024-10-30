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

const HomeScreen = () => {
  const navigation = useNavigation();
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const { selectedCity } = useContext(Place);
  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState([]); // State to store events
  const [categories, setCategories] = useState([]); // State to store categories
  const [selectedCategory, setSelectedCategory] = useState(); // State for filter

  useEffect(() => {
    const loadData = async () => {
      const fetchedEvents = await fetchEvents();
      console.log('fetching categories');
      const fetchedCategories = await fetchCategories();

      // Mapping foreign keys 
      const eventsWithCategoryNames = fetchedEvents.map((event) => {
        const category = fetchedCategories.find(
          (cat) => cat.idevent_category === event.idevent_category
        );
        return {
          ...event,
          categoryType: category ? category.category_type : "Unknown",
        };
      });

      setEvents(eventsWithCategoryNames);
      setCategories(fetchedCategories);
    };

    loadData();
  }, []); // Fetch data on component mount

  // Filtering function based on selected category
  const applyFilter = (filter) => {
    if (filter === "All") {
      return events; // Return all events if filter is "All"
    }
    switch (filter) {
      case "Koncert":
        return events.filter((event) => event.fk_idevent_category === 1);
      case "Festiwal":
        return events.filter((event) => event.fk_idevent_category === 2);
      case "Wystawa":
        return events.filter((event) => event.fk_idevent_category === 3);
      case "Maraton":
        return events.filter((event) => event.fk_idevent_category === 4);
      case "Konferencja":
        return events.filter((event) => event.fk_idevent_category === 5);
      case "Warsztaty":
        return events.filter((event) => event.fk_idevent_category === 6);
      case "Zawody":
        return events.filter((event) => event.fk_idevent_category === 7);
      case "Festyn":
        return events.filter((event) => event.fk_idevent_category === 10);
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
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={Header}
        data={applyFilter(selectedCategory)}
        renderItem={({ item, index }) => (
          <EventCard
            item={{
              ...item,
              location_name: item.event_location
                ? item.event_location.name
                : "Unknown Location",
              city_name: item.event_location?.city?.city || "Unknown City",
              photo: item.photo,
              description: item.description,
              price: item.ticket_price,
              isSeatCategorized: item.is_seat_categorized,
              categoryType: item.categoryType,
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
  );
};

export default HomeScreen;

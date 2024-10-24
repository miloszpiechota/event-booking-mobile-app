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
import EventCard from "../components/EventCard";
import Header from "../components/Header";
import {
  BottomModal,
  ModalFooter,
  ModalTitle,
  ModalContent,
} from "react-native-modals";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SlideAnimation } from "react-native-modals";
import { fetchEvents } from "../database/FetchEvents"; // Import the fetchEvents function
import { fetchCategories } from "../database/FetchCategories"; // Import the fetchCategories function

const HomeScreen = () => {
  const navigation = useNavigation();
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const { selectedCity } = useContext(Place);
  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState([]); // State to store events
  const [categories, setCategories] = useState([]); // State to store categories
  const [selectedCategory, setSelectedCategory] = useState(); // State for filter

  //   // Call the fetchCategories function
  // const displayFirstCategory = async () => {
  //   const categories = await fetchCategories();
  //   if (categories.length > 0) {
  //       // Log the first category in JSON format
  //       console.log(JSON.stringify(categories[0], null, 2));
  //   } else {
  //       console.log("No categories found");
  //   }
  // };

  // // Execute the function
  // displayFirstCategory();

  useEffect(() => {
    const loadData = async () => {
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);

      const fetchedCategories = await fetchCategories();
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
    <View style={{ flex: 1 }}>
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
        style={{
          position: "absolute",
          bottom: 10,
          backgroundColor: "rgba(63, 172, 171, 0.8)", // Lekko przezroczysty kolor

          // backgroundColor: "#3facab",
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

      {/* Modal filtering interface */}
      <BottomModal
        onBackDropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        visible={modalVisible}
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        onTouchOutside={() => setModalVisible(!modalVisible)}
        style={{
          justifyContent: "flex-end",
          margin: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)", // Slight transparency
        }}
      >
        <ModalContent
          style={{ width: "100%", height: 280, backgroundColor: "white" }}
        >
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
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Pressable
              style={{
                margin: 10,
                borderColor: selectedCategory === "All" ? "orange" : "#CBCBCB",
                borderWidth: 1,
                paddingVertical: 5,
                borderRadius: 25,
                paddingHorizontal: 11,
                backgroundColor:
                  selectedCategory === "All" ? "orange" : "white",
              }}
              onPress={() =>
                setSelectedCategory(selectedCategory === "All" ? null : "All")
              }
            >
              <Text
                style={{
                  color: selectedCategory === "All" ? "white" : "black",
                  fontWeight: selectedCategory === "All" ? "500" : "normal",
                }}
              >
                All
              </Text>
            </Pressable>

            {categories.length > 0 ? (
              categories.map((category) => (
                <Pressable
                  key={category.id}
                  style={{
                    margin: 10,
                    borderColor:
                      selectedCategory === category.category_type
                        ? "orange"
                        : "#CBCBCB",
                    borderWidth: 1,
                    paddingVertical: 5,
                    borderRadius: 25,
                    paddingHorizontal: 11,
                    backgroundColor:
                      selectedCategory === category.category_type
                        ? "orange"
                        : "white",
                  }}
                  onPress={() =>
                    setSelectedCategory(
                      selectedCategory === category.category_type
                        ? null
                        : category.category_type
                    )
                  }
                >
                  <Text
                    style={{
                      color:
                        selectedCategory === category.category_type
                          ? "white"
                          : "black",
                      fontWeight:
                        selectedCategory === category.category_type
                          ? "500"
                          : "normal",
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

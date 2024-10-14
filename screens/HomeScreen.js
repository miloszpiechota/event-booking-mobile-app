import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
} from "react-native";
import React, { useLayoutEffect, useRef, useContext, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Place } from "../PlacesContext";
import { events } from "../assets/data/events";
import MovieCard from "../components/EventCard";
import Header from "../components/Header";
import { BottomModal, ModalFooter, ModalTitle } from "react-native-modals";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SlideAnimation } from "react-native-modals";
import { ModalContent } from "react-native-modals";
const HomeScreen = () => {
  const navigation = useNavigation();
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const { selectedCity } = useContext(Place); //added
  const [modalVisible, setModalVisible] = useState(false);
  const languages = [
    {
      id: "0",
      language: "English",
    },
    {
      id: "10",
      language: "Polish",
    },
    {
      id: "1",
      language: "German",
    },
    {
      id: "2",
      language: "Spanish",
    },
    {
      id: "3",
      language: "Italian",
    },
    {
      id: "5",
      language: "Malayalam",
    },
  ];
  const genres = [
    {
      id: "0",
      language: "Horror",
    },
    {
      id: "1",
      language: "Comedy",
    },
    {
      id: "2",
      language: "Action",
    },
    {
      id: "3",
      language: "Romance",
    },
    {
      id: "5",
      language: "Thriller",
    },
    {
      id: "6",
      language: "Drama",
    },
  ];
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
      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={{
          position: "absolute",
          bottom: 30,
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
        <ModalContent style={{ width: "100%", height: 200 }}>
          <Text
            style={{
              paddingVertical: 5,
              fontSize: 15,
              fontWeight: "500",
              marginTop: 10,
            }}
          >
            Languages
          </Text>
          {languages.map((item, index) => {
            return (
              // Dodano return
              <Pressable key={item.id} style={{ paddingVertical: 5 }}>
                <Text>{item.language}</Text>
              </Pressable>
            );
          })}
        </ModalContent>
      </BottomModal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

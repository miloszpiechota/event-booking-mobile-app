import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Text>Hello Miłosz</Text>,
      headerStyle: {
        backgroundColor: '#f5f5f5',
        shadowColor: 'transparent',
        shadowOpacity: 0.3,
        shadowOffset: { width: -1, height: 1 },
        shadowRadius: 3,
      },
      // Zmienione tutaj
      headerRight: () => (
        <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          <EvilIcons name="location" size={24} color="black" />

          </Pressable>
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

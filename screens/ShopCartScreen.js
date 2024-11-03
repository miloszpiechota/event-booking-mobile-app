import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ShopCartScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ShopCartScreen</Text>
    </View>
  );
};

export default ShopCartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

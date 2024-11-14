import React, { useState, useEffect } from 'react';
import { Text, View, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const QrScanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  // Prośba o uprawnienia do kamery
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  // Obsługa wyniku skanowania
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert("Kod QR zeskanowany!", `Typ: ${type}\nDane: ${data}`);

    // Przykładowe nawigowanie do innego ekranu z przekazaniem danych
    navigation.navigate("NextScreen", { qrData: data });
  };

  if (hasPermission === null) {
    return <Text>Prośba o dostęp do kamery...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Brak dostępu do kamery.</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ height: '100%', width: '100%' }}
      />
      {scanned && (
        <Button title="Skanuj ponownie" onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

export default QrScanner;

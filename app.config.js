export default ({ config }) => ({
    ...config, // Zachowujemy istniejącą konfigurację Expo
    extra: {
      API_BASE_URL: process.env.API_BASE_URL || "http://192.168.56.1:3000", // Pobieramy wartość z ENV lub używamy domyślnej
    },
    ios: {
      ...config.ios, // Zachowujemy istniejącą konfigurację iOS
      infoPlist: {
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: true, // Pozwalamy na nieszyfrowane połączenia
          NSExceptionDomains: {
            "ngrok-free.app": {
              NSIncludesSubdomains: true,
              NSExceptionAllowsInsecureHTTPLoads: true, // Zezwalamy na HTTPS z niestandardowymi certyfikatami
              NSExceptionRequiresForwardSecrecy: false,
              NSExceptionMinimumTLSVersion: "TLSv1.2", // Wymuszamy TLS 1.2 jako minimum
            },
          },
        },
      },
    },
    android: {
      ...config.android, // Zachowujemy istniejącą konfigurację Android
    },
    "plugins": [
    "expo-barcode-scanner"
  ]
  });
  
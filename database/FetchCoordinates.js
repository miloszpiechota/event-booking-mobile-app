// FetchCoordinates.js

import axios from 'axios';

export const fetchCoordinates = async (locationName, city) => {
  try {
    // Połączenie nazwy lokalizacji i miasta
    const query = `${locationName}, ${city}`;
    
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: query,
        format: 'json',
        addressdetails: 1,
        limit: 1,
      },
      headers: {
        'User-Agent': 'YourAppName/1.0 (your.email@example.com)' // Zastąp nazwą swojej aplikacji
      }
    });

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      };
    } else {
      console.error("Nie znaleziono współrzędnych dla lokalizacji:", query);
      return null;
    }
  } catch (error) {
    console.error("Błąd podczas pobierania współrzędnych:", error);
    return null;
  }
};

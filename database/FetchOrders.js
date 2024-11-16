import { API_BASE_URL } from '@env';
export const fetchOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/orders/read`);

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await response.json();
    console.log("Fetched Orders:", data);  // Dodajmy logowanie danych

    return data; // Zwracamy dane zamówień
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

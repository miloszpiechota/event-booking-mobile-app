export const fetchOrders = async () => {
  try {
    const response = await fetch("http://192.168.56.1:3000/api/orders/read");

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

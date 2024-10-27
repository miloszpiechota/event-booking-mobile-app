// event-booking-app/database/FetchCategories.js

// FetchCategories.js
export const fetchCategories = async () => {
  try {
    const response = await fetch(
      "http://192.168.0.250:3000/api/eventCategories/read"
    );
    if (!response.ok) {
      console.log("nie dziala kategorie");
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();

    console.log("raw json");
    console.log(data);
    const eventCategories = data.eventCategories.map((eventCategories) => ({
      ...eventCategories,
    }));
    console.log(" json");
    console.log(eventCategories);
    return eventCategories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

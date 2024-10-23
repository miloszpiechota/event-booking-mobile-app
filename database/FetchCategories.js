// event-booking-app/database/FetchCategories.js

// FetchCategories.js
export const fetchCategories = async () => {
    try {
        const response = await fetch("http://192.168.56.1:3000/api/categories");
        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

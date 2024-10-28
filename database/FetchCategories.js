export const fetchCategories = async () => {
    try {
        const response = await fetch("http://192.168.56.1:3000/api/categories/read");

        console.log("Response status:", response.status);

        if (!response.ok) {
            const errorDetails = await response.text(); // Get more error details
            console.error("Error details:", errorDetails);
            throw new Error(`Failed to fetch categories: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        // Make sure to correctly access the data structure
        const eventCategories = data.map(category => ({
            ...category,
        }));

        console.log("Categories:", eventCategories);
        return eventCategories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

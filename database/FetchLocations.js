// FetchLocations.js
export const fetchLocations = async () => {
    try {
        const response = await fetch("http://192.168.56.1:3000/api/locations/read");
        if (!response.ok) {
            throw new Error("Failed to fetch locations");
        }
        const data = await response.json();
        console.log(data);

        // Przekształcamy dane, aby uzyskać przydatne informacje
        const locations = data.map(location => ({
            id: location.idevent_location,
            name: location.name,
            city: location.city.city,
            country: location.city.country.name_country
        }));

        console.log(locations);
        return locations;
    } catch (error) {
        console.error("Error fetching locations:", error);
        return [];
    }
};

// FetchEvents.js
export const fetchEvents = async () => {
    try {
        const response = await fetch("http://192.168.56.1:3000/api/events/read");
        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        //console.log(data);
        // Add categoryType from the related data for convenience
        const eventsWithCategory = data.event.map(event => ({
            ...event,
            // categoryType: event.event_category?.category_type || "Unknown Category",
            location_name: event.event_location?.name || "Unknown Location",
            city_name: event.event_location?.city?.city || "Unknown City"
        }));
                console.log(eventsWithCategory);

        return eventsWithCategory;
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
};
// FetchEvents.js
export const fetchEvents = async () => {
  try {
      const response = await fetch("http://192.168.56.1:3000/api/events/read");
      if (!response.ok) {
          throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      console.log(data);

      // Używamy prostszego mapowania
      const events = data.event.map(event => ({
        ...event,
        idevent: event.idevent, // Upewnij się, że `idevent` jest dostępne
        idevent_category: event.idevent_category, // Inne pola, jeśli są potrzebne
        numberOfTickets: event.number_of_ticket,
    }));
    

      console.log(events);
      return events;
  } catch (error) {
      console.error("Error fetching events:", error);
      return [];
  }
};

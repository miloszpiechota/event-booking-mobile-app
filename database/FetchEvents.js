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
          // Możesz dodać inne pola, które chcesz zachować z event
          idevent_category: event.idevent_category // Upewnij się, że mamy dostęp do idevent_category
      }));

      console.log(events);
      return events;
  } catch (error) {
      console.error("Error fetching events:", error);
      return [];
  }
};

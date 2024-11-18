// FetchEvents.js
import { API_BASE_URL } from '@env';
// FetchEvents.js
export const fetchEvents = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/events/read`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const data = await response.json();
    console.log(data);

    // Używamy prostszego mapowania
    const events = data.event.map(event => ({
      ...event,
      idevent: event.idevent,
      idevent_category: event.idevent_category,
      numberOfTickets: event.number_of_ticket,
    }));

    console.log(events);
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

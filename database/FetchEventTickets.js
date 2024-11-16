import { API_BASE_URL } from '@env';
export const fetchEventTickets = async () => {
    try {
      console.log("API_BASE_URL:", API_BASE_URL);

      const response = await fetch(`${API_BASE_URL}/api/event_tickets/read`);
  
      console.log("Response status:", response.status); // Log response status
  
      if (!response.ok) {
        const errorDetails = await response.text(); // Get more error details
        console.error("Error details:", errorDetails);
        throw new Error(`Failed to fetch event_tickets: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Fetched data:", data);
  
      // Make sure to correctly access the data structure
      const eventTickets = data.map(event_ticket => ({
        ...event_ticket,
      }));
  
      console.log("Event Tickets:", eventTickets);
      return eventTickets;
    } catch (error) {
      console.error("Error fetching event tickets:", error);
      return [];
    }
  };
  
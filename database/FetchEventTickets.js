export const fetchEventTickets = async () => {
    try {
      const response = await fetch("http://192.168.56.1:3000/api/event_tickets/read");
  
      if (!response.ok) {
        throw new Error(`Failed to fetch event tickets: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching event tickets:", error);
      return [];
    }
  };
  
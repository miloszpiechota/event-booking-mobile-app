export const fetchEventTickets = async () => {
    try {
      const response = await fetch("http://192.168.56.1:3000/api/event_tickets/read");
  
      console.log("Response status:", response.status);
  
      if (!response.ok) {
        const errorDetails = await response.text(); // Get more error details
        console.error("Error details:", errorDetails);
        throw new Error(`Failed to fetch event_tickets: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Fetched data:", data);
  
      // Make sure to correctly access the data structure
      const eventTickets = data.map(event_tickets => ({
        ...event_tickets,
      }));
  
      console.log("Event Tickets:", eventTickets);
      return eventTickets;
    } catch (error) {
      console.error("Error fetching event tickets:", error);
      return [];
    }
  };
  
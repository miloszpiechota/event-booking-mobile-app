export const fetchOrderTickets = async () => {
    try {
      const response = await fetch("http://192.168.56.1:3000/api/order_tickets/read");
  
      if (!response.ok) {
        throw new Error("Failed to fetch order tickets");
      }
  
      const data = await response.json();
      console.log("Response data structure:", data);
  
      if (!data.success) {
        throw new Error("Response indicated failure");
      }
  
      if (!data.data || !Array.isArray(data.data)) {
        throw new Error("Data is missing or not in array format");
      }
  
      const orderTickets = data.data.map((order) => ({
        idorder_ticket: order.idorder_ticket,
        idevent_ticket: order.event_ticket?.idevent_ticket ?? null,
        ticket_name: order.event_ticket?.name ?? "Unknown",
        ticket_start_date: order.event_ticket?.start_date ?? null,
        ticket_end_date: order.event_ticket?.end_date ?? null,
        ticket_price: order.event_ticket?.price ?? 0,
        ticket_status: order.ticket_status,
        order_id: order.order?.idorder ?? null,
        order_date: order.order?.data ?? null,
        order_total_amount: order.order?.total_amount ?? 0,
      }));
  
      console.log("Processed order tickets:", orderTickets);
      return orderTickets;
    } catch (error) {
      console.error("Error fetching order tickets:", error);
      return [];
    }
  };
  
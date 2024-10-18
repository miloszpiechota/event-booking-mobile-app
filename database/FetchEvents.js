// event-booking-app/database/FetchEvents.js

import { supabase } from './superbaseClient.ts'; // Upewnij się, że ścieżka jest poprawna

export const fetchEvents = async () => {
    const { data, error } = await supabase.from("event").select(`
        *,
        event_locations (
            name,
            fk_idcity (
                city
            )
        ),
        event_category (
            category_type
        )
    `);

    if (error) {
        console.error("Error fetching events:", error);
        return []; // Zwróć pustą tablicę w przypadku błędu
    }

    // Zmodyfikuj dane, aby dodać category_type do każdego wydarzenia
    const eventsWithCategory = data.map(event => ({
        ...event,
        categoryType: event.event_category?.category_type || "Nieznana kategoria" // Dodaj category_type
    }));

    return eventsWithCategory; // Zwróć zmodyfikowane dane
};

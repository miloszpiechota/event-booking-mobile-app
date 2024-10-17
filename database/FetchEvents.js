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
        )
    `);

    if (error) {
        console.error("Error fetching events:", error);
        return []; // Zwróć pustą tablicę w przypadku błędu
    }
    return data; // Zwróć pobrane dane
};

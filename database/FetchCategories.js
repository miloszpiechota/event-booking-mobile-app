// event-booking-app/database/FetchCategories.js

import { supabase } from './superbaseClient.ts'; // Upewnij się, że ścieżka jest poprawna

export const fetchCategories = async () => {
    const { data, error } = await supabase.from("event_category").select("*"); // Fetch all categories

    if (error) {
        console.error("Error fetching categories:", error);
        return []; // Zwróć pustą tablicę w przypadku błędu
    }
    return data; // Zwróć pobrane dane
};

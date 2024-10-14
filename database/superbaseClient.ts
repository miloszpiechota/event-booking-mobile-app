import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://qwrejfsjpymovppbwosa.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3cmVqZnNqcHltb3ZwcGJ3b3NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5Mjg5NTAsImV4cCI6MjA0NDUwNDk1MH0.ymRJ-_fCaflR9_4WJS_LGtiune4pWJGt3FmlJu9ek4M"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
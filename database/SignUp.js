
import { API_BASE_URL } from '@env';
export const handleSignup = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        return { success: true, message: "User created successfully!" };
      } else {
        return { success: false, message: result.error || "Something went wrong." };
      }
    } catch (error) {
      return { success: false, message: "Network error: " + error.message };
    }
  };
  
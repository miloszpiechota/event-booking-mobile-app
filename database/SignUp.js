

export const handleSignup = async (userData) => {
    try {
      const response = await fetch("http://192.168.56.1:3000/api/create", {
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
  
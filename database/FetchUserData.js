import Constants from 'expo-constants';

const { API_BASE_URL } = Constants.expoConfig.extra;

export const fetchUserData = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Pass the token for authorization
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data.user; // Assuming 'user' contains all the user details
    } else {
      throw new Error(data.msg || 'Failed to fetch user data.');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data.');
  }
};

// auth.js - Updated for JWT authentication
const AUTH_URL = import.meta.env.VITE_API_URL + '/auth'
// Register User
export async function registerUser(username, email, password) {
  try {
    const response = await fetch(AUTH_URL + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    const data = await response.json();
    return data; // returns token and user
  } catch (error) {
    throw new Error(error.message || "Registration failed");
  }
}

// Login User
export async function loginUser(username, password) {
  try {
    const response = await fetch(AUTH_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const data = await response.json();
    return data; // This should contain the JWT token and user info
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
}

export async function fetchUserData(token) {
    const response = await fetch(AUTH_URL + '/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,  // Pass token in Authorization header
        },
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    
    const data = await response.json();
    return data;  // This should return user data (like username, email, etc.)
}

// Logout User (clear JWT token)
export function logoutUser() {
  localStorage.removeItem("token");
  return true;
}

// Get the JWT token from localStorage
export function getToken() {
  return localStorage.getItem("token");
}

// Set the JWT token to localStorage
export function setToken(token) {
  localStorage.setItem("token", token);
}
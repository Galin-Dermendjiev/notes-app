import { useContext, useState, useEffect, createContext } from "react";
import { registerUser, loginUser, logoutUser, setToken, getToken, fetchUserData } from "../api/Auth";  

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [globalUser, setGlobalUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isAuthenticated = globalUser !== null

  useEffect(() => {
    const token = getToken(); 
    if (token) {
      const fetchData = async () => {
        try {
          const userData = await fetchUserData(token); 
          setGlobalUser(userData); 
        } catch (error) {
          console.log('Failed to fetch user data:', error.message);
        }
      };
  
      fetchData(); 
    }
  }, []);  

  async function signup(username, email, password) {
    setIsLoading(true);
    try {
      const response = await registerUser(username, email, password);
      const { token, user } = response;  // Destructure token and user data
      
      setToken(token);  
      setGlobalUser(user); 
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(username, password) {
    setIsLoading(true);
    try {
      const response = await loginUser(username, password);
      const { token, user } = response;  // Destructure token and user data

      setToken(token);  
      setGlobalUser(user);  
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    setGlobalUser(null);
    logoutUser(); // Clear JWT token from localStorage
  }

  const value = {
    isAuthenticated,
    globalUser,
    isLoading,
    error,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

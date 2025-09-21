import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // stores the logged-in user
  const [loading, setLoading] = useState(true); // loading state

  // Fetch the currently logged-in user
  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get('http://localhost:7777/loanpe/auth/me', {
        withCredentials: true,
      });
      setUser(res.data.user); // set user from response
    } catch (err) {
      setUser(null); // if error, no user
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    const res = await axios.post('http://localhost:7777/loanpe/auth/login',
      { email, password },
      { withCredentials: true }
    );

    setUser(res.data.user); // store the user in context
    return res.data.user; // return full user object instead of just role
  };

  // Logout function
  const logout = async () => {
    await axios.post('http://localhost:7777/loanpe/auth/logout', {}, { withCredentials: true });
    setUser(null); // clear user on logout
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

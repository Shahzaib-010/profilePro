import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Initialize from localStorage so refresh doesn't log user out
  const [user, setUser]   = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  const login = async (email, password) => {
    // Throws on failure so the form can catch and show the error
    const res = await api.post("/login", { email, password });

    const { token, user } = res.data; // adjust keys to match your API's actual response

    // Persist to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook — use this in any component
export function useAuth() {
  return useContext(AuthContext);
}

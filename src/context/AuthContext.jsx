import { createContext, useContext, useMemo, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

function getStoredUser() {
  const rawUser = localStorage.getItem("user");

  if (!rawUser || rawUser === "undefined") {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  const login = async (email, password) => {
    const res = await api.post("/login", { email, password });

    const { token, user } = res.data;

    localStorage.setItem("token", token);

    if (user === undefined) {
      localStorage.removeItem("user");
    } else {
      localStorage.setItem("user", JSON.stringify(user));
    }

    setToken(token);
    setUser(user ?? null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    token,
    login,
    logout,
    isLoggedIn: !!token,
  }), [user, token]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
export function useAuth() {
  return useContext(AuthContext);
}

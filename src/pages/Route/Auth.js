import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext({});

export default function Auth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const tokenData = localStorage.getItem("zippy-token");
    console.log("token", tokenData);
    if (tokenData) {
      setIsAuthenticated(true);
      const data = localStorage.getItem("zippy-user");
      console.log("dat6a", data);
      setToken(tokenData);
      setUser(JSON.parse(data));
    }
  }, []);

  const login = (t, userData) => {
    console.log("call login");
    localStorage.setItem("zippy-token", t);
    localStorage.setItem("zippy-user", JSON.stringify(userData));
    setUser({ ...userData });
    setToken(t);
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log("fun log");
    localStorage.removeItem("zippy-token");
    localStorage.removeItem("zippy-user");
    setIsAuthenticated(false);
    setUser({});
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

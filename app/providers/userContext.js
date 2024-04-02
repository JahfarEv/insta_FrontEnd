"use client";
import { createContext, useContext, useState, useEffect } from "react";

export const userContext = createContext();

export const useUserContext = () => {
  return useContext(userContext);
};

export const UserContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    // Check if localStorage is available before accessing it
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setAuthUser(JSON.parse(storedUser));
      }
    }
  }, []);

  return <userContext.Provider value={{ authUser, setAuthUser }}>{children}</userContext.Provider>;
};

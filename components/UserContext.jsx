"use client";
import React, { createContext, useReducer } from "react";
import { reducer, initialState } from "./UserReducer";

export const UserrContext = createContext();

const UserContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserrContext.Provider value={{ state, dispatch }}>
      {children}
    </UserrContext.Provider>
  );
};

export default UserContext;

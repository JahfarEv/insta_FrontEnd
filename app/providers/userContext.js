"use client"
import { createContext, useContext, useState } from "react";

export const userContext = createContext();

export const useUserContext = ()=>{
    return useContext(userContext)
};

export const UserContextProvider = ({children}) =>{
    const [authUser,setAuthUser] = useState(JSON.parse(localStorage.getItem("user"))|| null);

    return <userContext.Provider value={{authUser,setAuthUser}}>{children}</userContext.Provider>
}
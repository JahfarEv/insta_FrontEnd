"use client"
import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client'
const user = JSON.parse(window.localStorage.getItem("user"));


export const SocketContext = createContext()

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({children}) => {
const [socket,setSocket] = useState(null)
const [onlineUsers,setOnlineUsers] = useState([])

useEffect(()=>{
if(user){
    const socket = io("http://localhost:5000",{
        query:{
            userId: user._id,
        },
    });
    setSocket(socket)

    return ()=> socket.close()
}
else{
    if(socket){
        socket.close();
        setSocket(null);
    }
}
},[socket])

    return <SocketContext.Provider value={{socket,onlineUsers}}>
        {children}
    </SocketContext.Provider>
}
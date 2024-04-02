"use client"
import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client';

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  
  useEffect(() => {
    // Check if window is available before accessing localStorage
    if (typeof window !== 'undefined') {
      const user = JSON.parse(window.localStorage.getItem("user"));
      
      if (user) {
        const socket = io("https://www.api.sharescape.site", {
          query: {
            userId: user._id,
          },
        });
        setSocket(socket);

        return () => socket.close();
      } else {
        if (socket) {
          socket.close();
          setSocket(null);
        }
      }
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

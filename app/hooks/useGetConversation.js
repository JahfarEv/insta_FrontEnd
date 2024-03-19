"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversation = async ()=>{
        setLoading(true);
        try {
            const res = await axios.get(
                "http://localhost:5000/api/user/allusers",
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                  },
                }
              );
             if(res.status ===200){
                setConversations(res.data.users)
                console.log(res.data.users);
             }
              
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false)
        }
    }
    getConversation()
  }, []);
  return {loading,conversations};
};

export default useGetConversation;

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  let authorization;
  if (typeof window !== 'undefined') {
    authorization = "Bearer " + (localStorage.getItem("jwt") || '');
  } else {
    authorization = '';
  }

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://www.api.sharescape.site/api/user/allusers",
          {
            headers: {
              Authorization: authorization,
            },
          }
        );
        if (res.status === 200) {
          setConversations(res.data.users);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getConversation();
  }, [authorization]);

  return { loading, conversations };
};

export default useGetConversation;


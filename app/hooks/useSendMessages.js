"use client";
import { useState } from "react";
import useConversation from "../zustand/useConversation";

const useSendMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  let authorization;
  if (typeof window !== 'undefined') {
    authorization = "Bearer " + (localStorage.getItem("jwt") || '');
  } else {
    authorization = '';
  }

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.api.sharescape.site/api/message/send/${selectedConversation._id}`,
        {
          method: "post",
          headers: {
            "Content-type": "application/json",
            Authorization: authorization,
          },
          body: JSON.stringify({ message }),
        }
      )
      const data = await res.json()
      if(data.error) throw new Error(data.error)

      setMessages([...messages,data]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading };
};

export default useSendMessages;

"use client";
import { useState } from "react";
import useConversation from "../zustand/useConversation";

const useSendMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/message/send/${selectedConversation._id}`,
        {
          method: "post",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
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

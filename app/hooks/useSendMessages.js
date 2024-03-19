"use client"
import { useState } from "react";
import useConversation from "../zustand/useConversation";

const useSendMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
      setLoading(true);
    try {
        const res = await fetch('http://localhost:5000/api/message/send')
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
};

export default useSendMessages;

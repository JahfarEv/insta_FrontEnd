import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            if (!selectedConversation || !selectedConversation._id) {
                return; // Exit early if no selectedConversation or _id
            }

            setLoading(true);
            try {
                const res = await fetch(`http://www.api.sharescape.site/api/message/${selectedConversation._id}`, {
                    headers: {
            Authorization: "Bearer " + (typeof window !== 'undefined' ? localStorage.getItem("jwt") : ''),
                    },
                });
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setMessages(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getMessages();
    }, [selectedConversation, setMessages]);

    return { messages, loading };
};

export default useGetMessages;

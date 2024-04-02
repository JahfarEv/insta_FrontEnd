import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    let authorization;
    if (typeof window !== 'undefined') {
      authorization = "Bearer " + (localStorage.getItem("jwt") || '');
    } else {
      authorization = '';
    }

    useEffect(() => {
        const getMessages = async () => {
            if (!selectedConversation || !selectedConversation._id) {
                return; // Exit early if no selectedConversation or _id
            }

            setLoading(true);
            try {
                const res = await fetch(`https://www.api.sharescape.site/api/message/${selectedConversation._id}`, {
                    headers: {
                        Authorization: authorization,
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
    }, [selectedConversation._id, authorization]); // Include dependencies from useConversation and authorization

    return { messages, loading };
};

export default useGetMessages;

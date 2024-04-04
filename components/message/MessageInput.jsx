import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../app/hooks/useSendMessages";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <div className="fixed bottom-0 end-0 mb-8 mr-8">
      <form className="flex items-center w-[400px]" onSubmit={handleSubmit}>
        <input
          type="text"
          className="border text-sm rounded-lg p-2.5 bg-gray-700 border-gray-600 text-white mr-2 justify-center"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="flex items-center bg-blue-500 text-white rounded-lg px-3 py-2">
          {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;

"use cleint"
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
		<form className='px-4 my-3 sticky mb-[50px] md:mb-0 md:sticky md:top-[50px]' onSubmit={handleSubmit}>
  <div className='relative'>
    <input
      type='text'
      className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
      placeholder='Send a message'
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button type='submit' className='absolute inset-y-0 right-0 flex items-center pr-3'>
      {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
    </button>
  </div>
</form>

	);
};
export default MessageInput;
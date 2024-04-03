"use client"
import useConversation from "@/app/zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import {TiMessages} from "react-icons/ti"
import { useEffect } from "react";
import { useUserContext } from "@/app/providers/userContext";
import Image from "next/image";

const MessageContainer = () => {
  const {selectedConversation,setSelectedConversation} = useConversation()

  useEffect(()=>{
return ()=> setSelectedConversation(null);
  },[setSelectedConversation])
  return (
    <div className="md:min-w-[450px] flex flex-col">
    {!selectedConversation ? (
      <NoChatSelected />
    ):(
      <>
      
      <div className=" px-4 py-2 mb-2 sticky top-0 z-10 flex justify-between items-center rounded border">
  {/* <span className="label-text">To:</span>{" "} */}
  <span className=" font-bold justify-start">{selectedConversation?.name}</span>
  <Image src={selectedConversation.pic} width={35} height={35} alt="userpic" className="rounded-full"/>
</div>
        <Messages/>
        <MessageInput/>
      </>
    )}
    </div>
  );
};

export default MessageContainer;
const NoChatSelected = () => {
  const {authUser} = useUserContext()
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋{authUser?.name} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};
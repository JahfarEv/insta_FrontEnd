import { useSocketContext } from "@/app/providers/socketProvider";
import useConversation from "@/app/zustand/useConversation";
import { useUserContext } from "@/app/providers/userContext";
import Image from "next/image";
const Conversation = ({ conversation, lastidx }) => {
  const { authUser } = useUserContext();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  
  
  const isOtherUser = conversation._id !== authUser._id;

  if (!isOtherUser) {
    return null; 
  }

  return (
    <>
      <div
        className={`flex gsp-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <Image src={conversation.pic} alt="conversation" className="rounded-full mr-5" width={20} height={15}/>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.name}</p>
            <span className="text-xl">😍</span>
          </div>
        </div>
      </div>
      {!lastidx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;

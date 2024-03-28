import { useSocketContext } from "@/app/providers/socketProvider";
import useConversation from "@/app/zustand/useConversation";
import { useUserContext } from "@/app/providers/userContext";
const Conversation = ({ conversation, lastidx }) => {
const { authUser } = useUserContext();
const { selectedConversation, setSelectedConversation } = useConversation();
const isSelected = selectedConversation?._id === conversation._id;
const { onlineUsers } = useSocketContext();
const isOnline = onlineUsers.includes(conversation._id);
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
            <img src={conversation.pic} alt="" className="rounded-full mr-5" />
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

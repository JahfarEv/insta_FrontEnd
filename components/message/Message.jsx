import useConversation from "@/app/zustand/useConversation";
import { extractTime } from "@/lib/extractTime";
import { useUserContext } from "@/app/providers/userContext";
import Image from "next/image";

const Message = ({message}) => {
  const {authUser} = useUserContext()
  const {selectedConversation} = useConversation()
  const fromMe = message.senderId === authUser._id
  const formatedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.pic:selectedConversation?.pic
  const bubbleBgColor = fromMe ? 'bg-blue-300' :'bg-red-200'
  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avtar'>
        <div className='w-10 rounded-full'>
            <Image src={profilePic} alt='users image' width={35} height={35} className="rounded-full"/>
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500 ${bubbleBgColor}`}>{message.message}</div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formatedTime}</div>
    </div> 
  )
}

export default Message

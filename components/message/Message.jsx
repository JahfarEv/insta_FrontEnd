import useConversation from "@/app/zustand/useConversation";

const user = JSON.parse(window.localStorage.getItem("user"));

const Message = ({message}) => {
  const userId = user._id
  const {selectedConversation} = useConversation()
  const fromMe = message.senderId === userId
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? user.pic:selectedConversation.pic
  const bubbleBgColor = fromMe ? 'bg-blue-500' :""
  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avtar'>
        <div className='w-10 rounded-full'>
            <img src={profilePic} alt=''/>
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500 ${bubbleBgColor}`}>{message.message}</div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{message.createdAt}</div>
    </div> 
  )
}

export default Message

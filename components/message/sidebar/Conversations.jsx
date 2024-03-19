"use client"
import useGetConversation from '@/app/hooks/useGetConversation'
import Conversation from '@/components/Conversation'

const Conversations = () => {
    const {loading,conversations} = useGetConversation() 
  return (
    <div className='py-2 flex flex-col overflow-auto'>
    {conversations.map((conversation,idx)=>(
<Conversation
key={conversation._id}
conversation={conversation}
lastidx={idx === conversations.length -1}
/>
    ))}
    </div>
  )
}

export default Conversations

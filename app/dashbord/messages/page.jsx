import MessageContainer from '@/components/message/MessageContainer'
import React from 'react'
import Conversations from '@/components/message/sidebar/Conversations'

const Message = () => {
  return (
    <main className='flex w-full h-screen px-2'>
      <div className='flex flex-col flex-3 h-full overflow-y-auto w-1/2 mr-5'>
        <Conversations />
      </div>
      <div className='flex flex-col flex-7 h-full overflow-y-auto w-full'>
        <MessageContainer />
      </div>
    </main>
  )
}

export default Message

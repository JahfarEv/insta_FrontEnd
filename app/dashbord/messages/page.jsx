import MessageContainer from '@/components/message/MessageContainer'
import React from 'react'
import Conversations from '@/components/message/sidebar/Conversations'

const page = () => {
  return (
    <main className='flex w-full flex-grow'>
    <div className='flex flex-col flex-8 gap-y-8 max-w-lg max-auto pb-20 max-md:w-full'>
    <Conversations/>
    </div>
    <div className='flex flex-col flex-4 gap-y-4 max-w-lg max-auto ml-20 max-md:invisible'>
      <MessageContainer/>
    </div>
    </main>
  )
}

export default page


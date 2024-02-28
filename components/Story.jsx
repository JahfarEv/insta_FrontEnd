import React from 'react'

const Story = () => {
  return (
    <div className='bg-none overflow-x-scroll border flex space-x-4 border-none p-4'>
      {new Array(10).fill(0).map((_, i)=>(
        <div key={i}
        className='rounded-full w-14 ring-[2px] ring-pink-500 ring-offset-2 h-14 bg-black flex-none'>

        </div>
      ))}
    </div>
  )
}

export default Story

import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>
      <div className='chat-image avtar'>
        <div className='w-10 rounded-full'>
            <img src={"https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"} alt=''/>
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500`}>hi</div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:40</div>
    </div> 
  )
}

export default Message

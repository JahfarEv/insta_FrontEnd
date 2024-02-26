import Post from '@/components/Post'
import React, { Suspense } from 'react'

const dashbord = () => {
  return <main className='flex w-full flex-grow'>
    <div className='flex flex-col flex-1 gap-y-8 max-w-lg max-auto pb-20'>
      <Suspense>
        <Post/>
      </Suspense>
    </div>
    </main>
}

export default dashbord

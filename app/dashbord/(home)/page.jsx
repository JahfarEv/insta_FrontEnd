import Post from '@/components/Post'
import Story from '@/components/Story'
import React, { Suspense } from 'react'

const dashbord = () => {
  return <main className='flex w-full flex-grow'>
    <div className='flex flex-col flex-1 gap-y-8 max-w-lg max-auto pb-20'>
      <Suspense>
      <Story/>
      {new Array(5).fill(1).map((_, i)=>(
        <Post key={i} postIndex={i}/>
      ))}
        
      </Suspense>
    </div>
    <div className='flex flex-col flex-1 gap-y-4 max-w-lg max-auto pb-20 p-10 ml-20'>
      <Suspense>
        profile
      </Suspense>
      <div>Suggested for you</div>
      <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio asperiores ratione iste nam id sequi voluptatum culpa dignissimos illum, perferendis, ipsam a cumque? Rem quisquam ratione facere vel, officiis tempora nostrum sequi aspernatur dolore itaque quidem delectus aperiam fuga expedita, nesciunt veritatis, harum amet quae minus exercitationem at dicta? Explicabo quam consequuntur voluptate dolore distinctio impedit incidunt nihil molestiae quos. Incidunt expedita dicta impedit deleniti repellendus est id praesentium doloremque velit, fugit, voluptatem temporibus distinctio hic ipsum quae alias debitis, tempora molestiae explicabo eveniet doloribus animi rem? Hic dolore ipsa iure ipsum asperiores ea sequi in ad consequuntur est! Consectetur nam repellat aliquid, corporis fugiat impedit, eius illum perspiciatis velit debitis dignissimos rem culpa soluta. Distinctio eligendi fugit, quod harum quibusdam dolores modi quam illum rem doloribus beatae reprehenderit dicta nemo nisi officia consequatur commodi. Delectus explicabo in ab inventore blanditiis, nobis expedita tenetur accusamus velit voluptatum quos, doloribus ea placeat fugiat modi sit ad repellendus, ullam quo. Fugit atque asperiores necessitatibus voluptas nemo dolor excepturi minima ut explicabo sapiente labore, deleniti sunt exercitationem eius. Ducimus nulla recusandae adipisci, magnam quam neque fugiat veniam dignissimos illo numquam ipsum error doloremque temporibus, quis dicta consectetur necessitatibus mollitia quod voluptas repudiandae totam.
      </div>
    </div>
    </main>
}

export default dashbord

'use client'
import Post from '@/components/Post'
import Story from '@/components/Story'
import React, { Suspense, useEffect, useState } from 'react'
import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";
const user =JSON.parse(window.localStorage.getItem("user")) 
import axios from 'axios';
import { useRouter } from 'next/navigation';


const dashbord = () => {
  const router = useRouter()
  const [users,setUsers] = useState([])
  const [searchUser,seSearchUser] = useState("")

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/allusers",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );
        if (response.status === 200) {
          if(response.data.users !== user._id){
            setUsers(response.data.users);
            console.log(response.data.users);
          }
          
        }
        console.log(users);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);


//profile
const handleProfile = (userId)=>{
  router.push(`/dashbord/profile/${userId}`)
}
  return <main className='flex w-full flex-grow'>
    <div className='flex flex-col flex-8 gap-y-8 max-w-lg max-auto pb-20 max-md:w-full'>
      {/* <Story/> */}
     
        <Post/>
    </div>
    <div className='flex flex-col flex-4 gap-y-4 max-w-lg max-auto p-10 ml-20 max-md:invisible'>
      <Suspense>
      <Avatar/><h1 className='font-extrabold'>{user?.name} </h1>
      <div className='text-gray-400 font-normal'>Suggested for you</div>
      <div>
      
      {users.map((item)=>(
        
        <div key={item._id} className='flex justify-between flex-col md:flex-row '>
  <div className="flex justify-items-start mb-2 mt-3 mr-3">
    <img
      src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
      width={100}
      height={100}
      className="rounded-full"
    />
  </div>
  <div className='flex flex-col flex-10 w-2/3 max-w-lg font-semibold cursor-pointer mt-5 mb-2' onClick={() => handleProfile(item?._id)}>
    {item?.name}
  </div>
  <div className='flex flex-col flex-2 max-w-lg w-1/3 ml-5 justify-end md:order-last mb-2'>
    <button className='text-blue-700 ml-[80px]'>follow</button>
  </div>
</div>

        
      ))}
      </div>
      </Suspense>
      
      
    </div>
    </main>
}

export default dashbord

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

  const search = users.filter((val)=>{
if(searchUser === ""){
return val;
}
else if(
  val.name.toLowerCase().includes(searchUser.toLowerCase())
){
  return val
}
else{
  return "";
}
  })
//profile
const handleProfile = (userId)=>{
  router.push(`/dashbord/profile/${userId}`)
}
  return <main className='flex w-full flex-grow'>
    <div className='flex flex-col flex-8 gap-y-8 max-w-lg max-auto pb-20'>
      <Suspense>
      {/* <Story/> */}
     
        <Post/>
      </Suspense>
    </div>
    <div className='flex flex-col flex-4 gap-y-4 max-w-lg max-auto pb-20 p-10 ml-20'>
      <Suspense>
      <Avatar/><h1 className='font-extrabold'>{user?.name} </h1>
      <div className='text-gray-400 font-semibold'>Suggested for you</div>
      <div>
      
      {users.map((item)=>(
        
        <div key={item._id} className='flex w-full flex-grow justify-items-end'>
        <div className='flex flex-col flex-10 w-2/3 max-w-lg font-extrabold cursor-pointer' onClick={()=>handleProfile(item?._id)}>
        
        {item.name}
        </div>
        <div className='flex flex-col flex-2 max-w-lg w-1/3 ml-5 justify-end'>
          <button className='text-blue-700 ml-5'>follow</button>
        </div>
        </div>
        
      ))}
      </div>
      </Suspense>
      
      
    </div>
    </main>
}

export default dashbord

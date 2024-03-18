'use client'
import Post from '@/components/Post'
import Story from '@/components/Story'
import React, { Suspense, useEffect, useState } from 'react'
import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";
const user =JSON.parse(window.localStorage.getItem("user")) 
  const userId = user?._id
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const dashbord = () => {
  const router = useRouter()
  const [users,setUsers] = useState([])
  const [profile,setProfile] = useState([])


  useEffect(()=>{


    fetch(`http://localhost:5000/api/user/userbyid/${userId}`,{
      method:"get",
      headers:{
        "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then((res)=>res.json())
    .then((result)=>{
      setProfile(result.user)
    })
  },[userId])

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
          const filteredUsers = response.data.users.filter(
            (userId) => userId._id !== user._id
          );
          setUsers(filteredUsers);
          console.log(filteredUsers);
        }
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
    <div className='flex flex-col flex-4 gap-y-4 max-w-lg max-auto ml-20 max-md:invisible'>
    <div className='flex justify-between flex-col md:flex-row '> 
      <div className="flex justify-items-start mb-2 mt-3 mr-3">
      <img src={profile?.pic}
        width={50}
      height={50}
      className="rounded-full border object-cover"
      /><Link className='font-extrabold ml-3 mt-3 cursor-pointer' href={`/dashbord/profile/${userId}`}>{profile?.name} </Link>
      </div>
      <div className='flex flex-col flex-2 max-w-lg w-1/3 ml-5 justify-end md:order-last mb-5'>
    <button className='text-blue-700 ml-[80px]'>switch</button>
  </div>
      
      </div>
      <div className='text-gray-400 font-normal'>Suggested for you</div>
      {users.map((item)=>(
        
        <div key={item._id} className='flex justify-between flex-col md:flex-row '>
  <div className="flex mb-2">
    <img
      src={item?item.pic:"loading"}
      width={50}
      height={50}
      className="rounded-full"
    />
  </div>
  <h1 className='flex font-semibold cursor-pointer mt-3 ' onClick={() => handleProfile(item?._id)}>
    {item?.name}
  </h1>
  <div className='flex flex-col flex-2 max-w-lg w-1/3 ml-5 justify-end md:order-last mb-5'>
    <button className='text-blue-700 ml-[80px]'>follow</button>
  </div>
</div>

        
      ))}
      
      
      
      
    </div>
    </main>
}

export default dashbord

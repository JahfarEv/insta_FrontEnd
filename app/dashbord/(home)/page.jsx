'use client'
import Post from '@/components/Post'
import React, { useEffect, useState } from 'react'
import { useUserContext } from '@/app/providers/userContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const dashbord = () => {
  const {authUser} = useUserContext()
  const router = useRouter()
  const [users,setUsers] = useState([])
  const [profile,setProfile] = useState([])
  const [showFollow,setShowFollow] = useState({})
const userId  = useParams() 
  
  
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
  },[])

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
          const userMap = {};
            response.data.users.forEach((user) => {
              userMap[user._id] = user.followers.includes(authUser._id);
            });
            setUsers(response.data.users);
            console.log(response);
            setShowFollow(userMap);
          const filteredUsers = response.data.users.filter(
            (userId) => userId._id !== authUser._id
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

  //follow
  const followUser = async (userId) => {
    const followingState = { ...showFollow };
  
    try {
      if (followingState[userId]) {
        const response = await fetch('http://localhost:5000/api/users/unfollow', {
          method: 'put',
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
          body: JSON.stringify({
            unfollowId: userId
          })
        });
  
        const data = await response.json();
        console.log(data);
        followingState[userId] = false;
      } else {
        const response = await fetch('http://localhost:5000/api/users/follow', {
          method: 'put',
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
          body: JSON.stringify({
            followId: userId
          })
        });
  
        const data = await response.json();
        console.log(data);
        followingState[userId] = true;
      }
  
      setShowFollow(followingState);
    } catch (error) {
      console.error('Error:', error);
      
    }
  };

 
  
    
//profile
const handleProfile = (userId)=>{
  router.push(`/dashbord/profile/${userId}`)
}
  return <main className='flex w-full flex-grow'>
    <div className='flex flex-col flex-8 gap-y-8 max-w-lg max-auto pb-20 '>
      {/* <Story/> */}
     
        <Post/>
    </div>
    <div className='flex flex-col flex-4 gap-y-4 max-w-lg max-auto ml-20 max-md:invisible'>
    <div className='flex justify-between flex-col md:flex-row '> 
      <div className="flex justify-items-start mb-2 mt-3 mr-3">
      <img src={authUser?.pic}
      className="rounded-full border object-cover w-[70px] h-[70px]"
      /><Link className='font-extrabold ml-3 mt-5 cursor-pointer' href={`/dashbord/profile`}>{authUser?.name} </Link>
      </div>
      <div className='flex flex-col flex-2 max-w-lg w-1/3 ml-5 justify-end md:order-last mb-5'>
    <Link href='/login' className='text-blue-700 ml-[80px]'>switch</Link>
  </div>
      
      </div>
      <div className='text-gray-400 font-normal'>Suggested for you</div>
      {users.map((item)=>(
        
        <div key={item._id} className='flex justify-between flex-col md:flex-row '>
  <div className="flex mb-2">
    <img
      src={item?item.pic:"loading"}
      
      className="rounded-full w-[50px] h-[50px]"
    />
  </div>
  <h1 className='flex font-semibold cursor-pointer mt-3 ' onClick={() => handleProfile(item?._id)}>
    {item?.name}
  </h1>
  <div className='flex flex-col flex-2 max-w-lg w-1/3 ml-5 justify-end md:order-last mb-5'>
  <button onClick={() => followUser(item._id)} className='text-blue-700 ml-[80px]'>
                    {showFollow[item._id] ? "Following" : "Follow"}
                  </button>
  </div>
  
 
  </div>


        
      ))}
      
      
      
      
    </div>
    </main>
}

export default dashbord

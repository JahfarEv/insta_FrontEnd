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
          const limitedUsers = response.data.users.slice(0, 5);

            limitedUsers.forEach((user) => {
              
              userMap[user._id] = user.followers.includes(authUser._id);
              
              
              
            });
            setUsers(limitedUsers);
            setShowFollow(userMap);
          const filteredUsers = limitedUsers.filter(
            (userId) => userId._id !== authUser._id
          );
          setUsers(filteredUsers);
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
  return <main className='flex flex-col md:flex-row w-full flex-grow'>
  <div className='flex flex-col flex-8 gap-y-8 max-w-lg mx-auto pb-20'>
    {/* <Story/> */}
    <Post/>
  </div>
  <div className='flex flex-col flex-4 gap-y-4 max-w-lg mx-auto md:ml-20 md:max-sm:invisible'>
  <div className='flex flex-col md:flex-row justify-between items-start mb-2 mt-3 mr-3'>
    <img
      src={authUser?.pic}
      className="rounded-full w-10 h-10 md:w-12 md:h-12 mr-3"
    />
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full md:ml-3">
      <Link className='font-extrabold mt-1 cursor-pointer' href={`/dashbord/profile`}>{authUser?.name}</Link>
      <Link href='/login' className='text-blue-700 mt-1 md:ml-auto'>Switch</Link>
    </div>
  </div>
  <div className='text-gray-400 font-normal'>Suggested for you</div>
  {users.map((item) => (
    <div key={item._id} className='flex flex-col md:flex-row justify-between items-center'>
      <img
        src={item ? item.pic : "loading"}
        className="rounded-full w-10 h-10 md:w-12 md:h-12 mr-3"
      />
     <h1 className='flex items-start font-normal cursor-pointer' onClick={() => handleProfile(item?._id)}>
  <span className="mr-2">{item?.name}</span>
  {/* Add other elements here if needed */}
</h1>

      <button onClick={() => followUser(item._id)} className='text-blue-700 ml-auto md:ml-3'>
        {showFollow[item._id] ? "Following" : "Follow"}
      </button>
    </div>
  ))}
</div>

</main>

}

export default dashbord

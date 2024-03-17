"use client";
import { Avatar } from "@nextui-org/avatar";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Footer } from "@/components/Footer";
const user = JSON.parse(window.localStorage.getItem("user"));

const Profile = () => {
  const [userProfile,setUser] = useState([]);
  const [userPost,setPost] = useState([])
  const  user = useParams();
  const userId = user.users
  const [showFollow,setShowFollow] = useState(true)
  
  useEffect(() => {
    fetch(`http://localhost:5000/api/users/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result.data.user);
        setPost(result.data.posts)
        console.log(result);
      });
  }, []);

console.log(userProfile.followers);
  //follow
  const followUser = () => {
    fetch('http://localhost:5000/api/users/follow', {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        followId: user.users
      })
    })
    .then(res => res.json()) 
     .then(data=>{
      console.log(data);
      setShowFollow(false)

     })
    }
  
    //unfollow

    const unfollowUser = () => {
      fetch('http://localhost:5000/api/users/unfollow', {
        method: 'put',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          followId: user.users
        })
      })
      .then(res => res.json()) 
       .then(data=>{
        console.log(data);
       })
      }
  
  return (
    <>
     
      <div className="flex justify-evenly flex-col md:flex-row mb-[100px]">
        <div className="flex justify-items-start ">
          <img
            src={userProfile?userProfile.pic:"loading"}
            width={100}
            height={300}
            className="rounded-full"
          />
        </div>
        <div className="my-4 md:ml-8">
          <h3 className="text-xl font-semibold">{userProfile?.name}</h3>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="flex flex-col md:mr-8">
              <div className="flex flex-row justify-between">
                <h6 className="mr-3">{userPost.length} posts </h6>
                <h6 className="mr-3">{userProfile.followers ? userProfile.followers.length : 0} followers</h6>
                <h6>{userProfile.following ? userProfile.following.length : 0} following</h6>
              </div>
              <p className="text-sm font-light">{userProfile?.email}</p>
              {showFollow ? <button className="bg-blue-500" onClick={()=>followUser()}>Follow</button>
              :<button className="bg-blue-500" onClick={()=>unfollowUser()}>UnFollow</button>
              }
              
              
            </div>
          </div>
        </div>
      </div>
<div className="border"></div>
      <div className="flex flex-wrap justify-center mt-5">
        {userPost.map((item) => (
          <div
            key={item._id}
            className="flex justify-center items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-4"
          >
            <div className="w-full h-[300px]">
              <img
                key={item._id}
                className="w-full h-full object-cover rounded-lg"
                src={item.photo}
                alt={item.title}
              />
            </div>
          </div>
        ))}
      </div>

     
      <div>
        <Footer/>
      </div>
   
    </>
  );
};

export default Profile;


"use client";
import { Avatar } from "@nextui-org/avatar";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
const user = JSON.parse(window.localStorage.getItem("user"));

const Profile = () => {
  const [userProfile,setUser] = useState([]);
  const [userPost,setPost] = useState([])
  const  user = useParams();
  const userId = user.users
console.log(user.users);

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
      });
  }, []);


  //follow
  const followUser = () => {
    fetch('http://localhost:5000/api/users/follow', {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        followId: user.users
      })
      
    })
    .then(res => {
      console.log(followId);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }
  
  return (
    <>
    
    {userProfile ? 
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="flex flex-col justify-center items-center">
          <Avatar
            width={"120px"}
            hieght={"120px"}
            className="border-4 rounded-full p-3"
          />
          <div className="my-4 text-center">
          <h3>{userProfile.name}</h3>
           <p className="text-sm font-light">{userProfile.email}</p>
          </div>
          <div className=" flex justify-around w-[600px] text-center my-4 border p-4">
            <div className="flex flex-col justify-between">
              <h6>{userPost.length} posts</h6>
              <h6>40 followers</h6>
              <h6>40 following</h6>
            </div>
            
          </div>
          <button className="bg-blue-500" onClick={()=>followUser()}>Follow</button>
        </div>
        <div className="flex w-2/3 flex-grow">
          {userPost.map((post)=>(
            <div key={post._id} className="flex flex-col w-[300px] border mt-6 mx-2 ">
              <img
                key={post._id}
                className="item h-[300px] "
                src={post.photo}
                alt={post.title}
                
              />
            </div>
          ))}
           
       
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
    : <h2>loading...!</h2>}
    </>
  );
};

export default Profile;


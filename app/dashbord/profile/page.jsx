'use client'
import { Avatar } from "@nextui-org/avatar";
import React, { useEffect, useState } from "react";
const user = localStorage.getItem('username')
const email = localStorage.getItem('email')

const Profile = () => {

    const [posts,setPost] = useState([])
    useEffect(()=>{
const getPost = async()=>{
    const response =await fetch('http://localhost:5000/api/user/profile',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    setPost(await response.json())
}
getPost()
    },[])
    console.log(posts,'posts');
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="flex flex-col justify-center items-center">
            <Avatar width={'120px'} hieght={'120px'} className="border-4 rounded-full p-3"/>
            <div className="my-4 text-center">
                <h3 className="text-xl font-semibold">{user}</h3>
                <p className="text-sm font-light">{email}</p>
            </div>
            <div className=" flex justify-around w-[600px] text-center my-4 border p-4">
                <div className="flex flex-col justify-between">
                <h6>40 posts</h6>
                <h6>40 followers</h6>
                <h6>40 following</h6>
                </div>
            </div>
        </div>
        <div className="flex justify-between items-center">
            <div className="w-[200px] h-[300px] border mt-6 mx-2"></div>
            <div className="w-[200px] h-[300px] border mt-6 mx-2"></div>
            <div className="w-[200px] h-[300px] border mt-6 mx-2"></div>
            <div className="w-[200px] h-[300px] border mt-6 mx-2"></div>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Profile;

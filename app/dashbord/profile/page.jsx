'use client'
import { Avatar } from "@nextui-org/avatar";
import React, { useEffect, useState } from "react";


const Profile = () => {
const [mypics,setMypics] = useState([])
const user =JSON.parse(window.localStorage.getItem("user")) 
console.log(user.name);
    

    useEffect(()=>{
 fetch('http://localhost:5000/api/post/mypost',{
        headers: {
            
      "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
        
    }).then(res=>res.json())
   .then(result=>{
    setMypics(result.mypost)
   })


    },[])
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="flex flex-col justify-center items-center">
            <Avatar width={'120px'} hieght={'120px'} className="border-4 rounded-full p-3"/>
            <div className="my-4 text-center">
                <h3 className="text-xl font-semibold">{user?.name}</h3>
                <p className="text-sm font-light"></p>
            </div>
            <div className=" flex justify-around w-[600px] text-center my-4 border p-4">
                <div className="flex flex-col justify-between">
                <h6>40 posts</h6>
                <h6>40 followers</h6>
                <h6>40 following</h6>
                </div>
            </div>
        </div>
        <div>
        {mypics.map((item)=>(
        <div className="flex justify-between  flex-col">
            <div className="w-[300px] h-[400px] border mt-6 mx-2 ">
              <img key={item._id} className="item" src={item.photo} alt={item.title}/>
            </div>
            
        </div>
        ))}
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Profile;

"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "@/app/providers/userContext";
const user =JSON.parse(window.localStorage.getItem("user")) 
const Conversation = () => {
  const {authUser} = useUserContext()
  const [users,setUsers] = useState([])

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


  return (
    <>
    
    {users.map((item)=>(
        
      <div key={item._id} className='flex justify-between flex-col md:flex-row  '>
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
    <button className='text-blue-700 ml-[80px]'>follow</button>
  </div>
</div>
    ))}
    </>
  )
}

export default Conversation
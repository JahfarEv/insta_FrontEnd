"use client";
import { Search, Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/avatar";
const user = JSON.parse(window.localStorage.getItem("user"));
console.log(user._id);
const SearchFunction = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");

  

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
        console.log(users);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const search = users.filter((val) => {
    if (searchUser === "") {
      return val;
    } else if (val.name.toLowerCase().includes(searchUser.toLowerCase())) {
      return val;
    } else {
      return "";
    }
  });

  const handleProfile = (userId) => {
    router.push(`/dashbord/profile/${userId}`);
  };
  return (
<div className="flex justify-center items-center h-full mb-5">
  <div className="flex flex-col items-center w-full md:w-1/2">
    <div className="flex items-center w-full text-neutral-600 dark:text-neutral-400 bg-zinc-100 dark:bg-neutral-800 gap-x-2 rounded-md px-3.5 py-1.5">
      <Search className="h-4 w-4" />
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent placeholder:text-neutral-600 dark:placeholder:text-neutral-400 flex-1 outline-none"
        onChange={(e) => {
          setSearchUser(e.target.value);
        }}
      />
    </div>

    <div className="flex flex-col items-center w-full">
      {search.map((item) => (
        <div
          key={item._id}
          className="flex justify-between items-center flex-row gap-4 sm:gap-8 lg:gap-10 border p-2 mt-5 w-full"
        >
          <div className="mb-4 mt-4">
            <img src={item.pic} className="w-[50px] h-[50px] rounded-full"/>
          </div>
          <h1
            className="font-bold text-xl mb-4 mt-4 cursor-pointer"
            onClick={() => handleProfile(item?._id)}
          >
            {item.name}
          </h1>
          <h1 className="mb-4 mt-4 text-right">{users.followers?.includes == user.id?"following":<button>follow</button>}</h1>
        </div>
      ))}
    </div>
  </div>
</div>


  

  )}

export default SearchFunction;


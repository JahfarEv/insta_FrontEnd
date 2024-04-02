"use client"
import { Search,Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useUserContext } from "@/app/providers/userContext";
const user =JSON.parse(window.localStorage.getItem("user")) 


const Header = () => {
  const [users,setUsers] = useState([])
  const [searchUser,setSearchUser] = useState("")
  const {authUser} = useUserContext()
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "http://www.api.sharescape.site/api/user/allusers",
          {
            headers: {
              Authorization: "Bearer " + (typeof window !== 'undefined' ? localStorage.getItem("jwt") : ''),
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
  }, [users]);

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
  return (
    <header className="fixed md:hidden bg-white top-0 flex items-center justify-between dark:bg-neutral-950 w-full z-50 border-zinc-300 dark:border-neutral-700 px-3 py-2 sm:ml-6">
      <Link href={"/dashbord"}>
        <p className={`font-semibold text-xl max-sm:invisible`}>Share scape</p>
      </Link>

      <div className="flex items-center space-x-2">
        <div className="flex items-center text-neutral-600 dark:text-neutral-400 bg-zinc-100 dark:bg-neutral-800 gap-x-2 rounded-md px-3.5 py-1.5">
          <Search className="h-4 w-4" />
          <input type="text" 
            placeholder="Search"
            className="bg-transparent placeholder:text-neutral-600 dark:placeholder:text-neutral-400 flex-1 outline-none"
            onChange={(e)=>{
              setSearchUser(e.target.value)
            }}
          />
        </div>
        <div>
          {search.map((user)=>{
            <div key={user._id}>
{user.name}
            </div>
          })}
        </div>
        <Button size={"icon"} variant={"ghost"}><Heart/></Button>
      </div>
    </header>
  );
};

export default Header;

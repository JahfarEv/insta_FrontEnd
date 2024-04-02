"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/providers/userContext";
import { Search, Heart } from "lucide-react";
import { useParams } from "next/navigation";

const SearchFunction = () => {
  const { authUser } = useUserContext();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [showFollow, setShowFollow] = useState(true);
  const [profile, setProfile] = useState([]);

  let authorization;
  if (typeof window !== 'undefined') {
    authorization = "Bearer " + (localStorage.getItem("jwt") || '');
  } else {
    authorization = '';
  }

const userId = useParams()

useEffect(() => {
  fetch(`https://www.api.sharescape.site/api/user/userbyid/${userId}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      setProfile(result.user);
    });
}, [userId]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("https://www.api.sharescape.site/api/user/allusers", {
          headers: {
            Authorization:authorization,
          },
        });
        if (response.status === 200) {
          const userMap = {};
          response.data.users.forEach((user) => {
            userMap[user?._id] = user.followers.includes(authUser?._id);
          });
          setShowFollow(userMap);
          const filteredUsers = response.data.users.filter((user) => user?._id !== authUser?._id);
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [authUser?._id]);

  const search = users.filter((val) => {
    if (searchUser === "") {
      return val;
    } else if (val.name.toLowerCase().includes(searchUser.toLowerCase())) {
      return val;
    } else {
      return "";
    }
  });

  const followUser = async (userId) => {
    const followingState = { ...showFollow };

    try {
      if (followingState[userId]) {
        const response = await fetch("https://www.api.sharescape.site/api/users/unfollow", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorization,
          },
          body: JSON.stringify({
            unfollowId: userId,
          }),
        });

        const data = await response.json();
        console.log(data);
        followingState[userId] = false;
      } else {
        const response = await fetch("https://www.api.sharescape.site/api/users/follow", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorization,
          },
          body: JSON.stringify({
            followId: userId,
          }),
        });

        const data = await response.json();
        console.log(data);
        followingState[userId] = true;
      }

      setShowFollow(followingState);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleProfile = (userId) => {
    router.push(`/dashbord/profile/${userId}`);
  };

  return (
    <div className="flex justify-center items-center h-full mb-5">
      <div className="flex flex-col items-center w-full md:w-1/2">
        <div className="sticky top-0 z-10 bg-zinc-100 dark:bg-neutral-800 flex items-center w-full text-neutral-600 dark:text-neutral-400 gap-x-2 rounded-md px-3.5 py-1.5">
          <Search className="h-4 w-4" />
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent placeholder-text-neutral-600 dark:placeholder-text-neutral-400 outline-none"
            onChange={(e) => {
              setSearchUser(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col items-center w-full">
          {search.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center flex-row gap-4 sm:gap-8 lg:gap-10 border p-2 mt-5 w-full rounded-md"
            >
              <div className="mb-4 mt-4">
                <Image
                  src={item.pic}
                  alt="searchimage"
                  className="w-[50px] h-[50px] rounded-full"
                  width={50}
                  height={50}
                />
              </div>
              <h1
                className="font-bold text-xl mb-4 mt-4 cursor-pointer"
                onClick={() => handleProfile(item?._id)}
              >
                {item.name}
              </h1>
              <button onClick={() => followUser(item._id)} className="text-blue-700 ml-auto md:ml-3 flex-1 text-right">
                {showFollow[item._id] ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFunction;

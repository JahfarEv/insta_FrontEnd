"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { useUserContext } from "@/app/providers/userContext";

const Profile = () => {
  const [userProfile, setUser] = useState([]);
  const [userPost, setPost] = useState([]);
  const users = useParams();
  const userId = users.users;
  const [showFollow, setShowFollow] = useState(true);
  const { authUser } = useUserContext();

  let authorization;
  if (typeof window !== "undefined") {
    authorization = "Bearer " + (localStorage.getItem("jwt") || "");
  } else {
    authorization = "";
  }
  let user;
  if (typeof window !== "undefined") {
    user = JSON.parse(window.localStorage.getItem("user"));
  }

  const logUserid = user._id;
  useEffect(() => {
    if (logUserid) {
      fetch(`https://www.api.sharescape.site/api/users/user/${userId}`, {
        headers: {
          Authorization: authorization,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setUser(result?.data?.user);
          setPost(result?.data?.posts);
          setShowFollow(result?.data?.user?.followers?.includes(logUserid));
          console.log(result);
        });
    }
  }, [userId]);

  //follow
  const followUser = async () => {
    try {
      if (logUserid) {
        if (showFollow) {
          const response = await fetch(
            "https://www.api.sharescape.site/api/users/unfollow",
            {
              method: "put",
              headers: {
                "Content-Type": "application/json",
                Authorization: authorization,
              },
              body: JSON.stringify({
                unfollowId: userId,
              }),
            }
          );

          const data = await response.json();
          console.log(data);
          setShowFollow(false);
        } else {
          const response = await fetch(
            "https://www.api.sharescape.site/api/users/follow",
            {
              method: "put",
              headers: {
                "Content-Type": "application/json",
                Authorization: authorization,
              },
              body: JSON.stringify({
                followId: userId,
              }),
            }
          );

          const data = await response.json();
          console.log(data);
          setShowFollow(true);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="flex justify-evenly flex-col md:flex-row mb-[100px]">
        <div className="flex justify-items-start ">
          <Image
            src={userProfile ? userProfile.pic : "loading"}
            alt="userProfil"
            className="rounded-full w-[250px] h-[250px]"
            width={100}
            height={100}
          />
        </div>
        <div className="my-4 md:ml-8">
          <h3 className="text-xl font-semibold">{userProfile?.name}</h3>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="flex flex-col md:mr-8">
              <div className="flex flex-row justify-between">
                <h6 className="mr-3">{userPost?.length} posts </h6>
                <h6 className="mr-3">
                  {userProfile?.followers ? userProfile.followers.length : 0}{" "}
                  followers
                </h6>
                <h6>
                  {userProfile?.following ? userProfile.following.length : 0}{" "}
                  following
                </h6>
              </div>
              <p className="text-sm font-light">{userProfile?.email}</p>
              <button onClick={followUser} className="bg-blue-500">
                {showFollow ? "Following" : "Follow"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="border"></div>
      <div className="flex flex-wrap justify-center mt-5">
        {userPost?.map((item) => (
          <div
            key={item._id}
            className="flex justify-center items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-4"
          >
            <div className="w-full h-[300px]">
              <Image
                key={item._id}
                className="w-full h-full object-cover rounded-lg"
                src={item.photo}
                alt={item.title}
                width={300}
                height={400}
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default Profile;

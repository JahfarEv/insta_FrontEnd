"use client";
import { Footer } from "@/components/Footer";
import { px } from "framer-motion";
import React, { useEffect, useState } from "react";
const Profile = () => {
  const [mypics, setMypics] = useState([]);
  const user = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    fetch("http://localhost:5000/api/post/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setMypics(result.mypost);
      });
  }, []);
  return (
    <>
      <div className="flex justify-evenly flex-col md:flex-row mb-[100px]">
        <div className="flex justify-items-start ">
          <img
            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
            width={100}
            height={300}
            className="rounded-full"
          />
        </div>
        <div className="my-4 md:ml-8">
          <h3 className="text-xl font-semibold">{user?.name}</h3>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="flex flex-col md:mr-8">
              <div className="flex flex-row justify-between">
                <h6 className="mr-3">{mypics.length} posts </h6>
                <h6 className="mr-3"> 40 followers</h6>
                <h6> 40 following</h6>
              </div>
              <p className="text-sm font-light">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
<div className="border"></div>
      <div className="flex flex-wrap justify-center mt-5">
        {mypics.map((item) => (
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

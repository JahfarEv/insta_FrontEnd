"use client";
import { Avatar } from "@nextui-org/avatar";
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
    <div className="flex justify-between flex-col md:flex-row">
  <div className="flex justify-items-start ">
    <img
      src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
      width={200}
      height={200}
      className="rounded-full"
    />
  </div>
  <div className="my-4 text-center md:ml-8">
    <h3 className="text-xl font-semibold">{user?.name}</h3>
    <p className="text-sm font-light">{user?.email}</p>
    <div className="flex flex-col md:flex-row items-center justify-center">
      <div className="flex flex-col justify-center items-center md:mr-8">
        <div className="flex flex-col justify-between">
          <h6>{mypics.length}</h6>
          <h6>40 followers</h6>
          <h6>40 following</h6>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        {/* Your second partition content */}
      </div>
    </div>
  </div>
</div>

  
        <div className="flex w-2/3 flex-grow">
          {mypics.map((item) => (
            <div key={item._id} className="flex flex-row w-[300px] border mt-6 mx-2 ">
              <img 
                key={item._id}
                className="item h-[300px] max-w-screen-md rounded-lg"
                src={item.photo}
                alt={item.title}
              />
            </div>
          ))}
        </div>
        <div></div>
        <div></div>
      
    </>
  );
};

export default Profile;

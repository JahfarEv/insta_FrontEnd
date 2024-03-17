"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import GoogleButton from "react-google-button";
import { signIn, useSession } from "next-auth/react";
import useAuthStore from "../zustand/authStore";
import axios from "axios";
import { useRouter } from "next/navigation";

const signup = () => {
  const route = useRouter()
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image,setImage] = useState("")
  const [url,setUrl] = useState("")
  const [focus, setFocus] = useState({
    errName: false,
    errEmail: false,
    errPassword: false,
  });

  useEffect(()=>{
if(url){
  uploadFields()
}
  },[url])
  const uploadPic = () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "insta-clone");
    formData.append("cloud_name", "dbcs1wzb6");

    fetch("https://api.cloudinary.com/v1_1/dbcs1wzb6/image/upload", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFields =async ()=>{
    await fetch("http://localhost:5000/api/user/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        password,
        email,
        pic:url
      })
    }).then(res=>
      res.json()).then(data=>{
        console.log(data);
        if(data.error){
        }
       else{
        route.replace("/login")
        console.log('success');
       }
      })
  }
  const PostData =async ()=>{
    if(image){
      uploadPic()
    }
    else{
uploadFields()
    }
   
  }
 
  const { data: session } = useSession();
  const {
    googleUserName,
    setGoogleUserName,
    setGoogleEmail,
    googleEmail,
    setGoogleProfile,
    googleProfile,
  } = useAuthStore();
  useEffect(() => {
    if (session && session.user) {
      setGoogleUserName(session.user.name);
      setGoogleEmail(session.user.email);
      setGoogleProfile(session.user.image);
    }
  }, [session]);

  const handleGoogleSign = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashbord" });
      const userData = {
        username: googleUserName,
        email: googleEmail,
        profile: googleProfile,
      };
      const response = await axios.post(
        "http://localhost:5000/api/user/new/google-user",
        userData
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-none p-8 rounded shadow-md w-96 border-spacing-3 ">
        <h1 className="text-4xl text-center font-semibold mb-8">Share scape</h1>
        <form>
          <GoogleButton
            onClick={handleGoogleSign}
            style={{ width: "315px", border: "rounded" }}
          />

          <div className="text-center text-gray-500 mt-4 mb-3">- OR -</div>

          <input
            type="text"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            pattern="^[A-Za-z0-9].{2,10}"
            onBlur={() => setFocus({ ...focus, errName: true })}
            focus={focus.errName.toString()}
          />
           <span className="spn">
                  Username should have 3-10 characters..
                </span>
          <input
            type="text"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            onBlur={() => setFocus({ ...focus, errEmail: true })}
                  focus={focus.errEmail.toString()}
          />
         <span className="spn">Enter a valid Email Id</span>
          
        <input
            type="password"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            pattern="(?=^.{6,16}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
            onBlur={() => setFocus({ ...focus, errPassword: true })}
                  focus={focus.errPassword.toString()}
          />
          {/* <span className="spn">
                  Password must have a minimum 6 characters and include atleast
                  1 uppercase 1 digit and 1 special characters
                </span> */}
                <div className="flex items-center justify-center mb-3">
  <label htmlFor="upload" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer w-full text-center">
    Upload pic
  </label>
  <input
    id="upload"
    type="file"
    className="hidden"
    onChange={(e) => setImage(e.target.files[0])}
  />
</div>

          <button
          onClick={()=>PostData()}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            {" "}
            Sign up
          </button>
          <p className="text-red-600 text-[16px] mb-4"></p>
        </form>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link
          className="block text-center text-blue-500 hover:underline mt-2"
          href="/login"
        >
          Login with an existing account
        </Link>
      </div>
    </div>
  );
};

export default signup;

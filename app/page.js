"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import GoogleButton from "react-google-button";
import { signIn, useSession } from "next-auth/react";
import useAuthStore from "./zustand/authStore";

const login = () => {
  const route = useRouter();
  const loginEmail = useRef(null);
  const loginPassword = useRef(null);
  const loginUser = async (e) => {
    e.preventDefault();
    e.preventDefault();
    const email = loginEmail.current.value;
    const password = loginPassword.current.value;
    try {
      const data = {
        email: email,
        password: password,
      };
      await axios
        .post("http://localhost:5000/api/user/login", data)
        .then((res) => {
          route.push('/dashbord')
          console.log(res.data.others._id);
          localStorage.setItem("token",res.data.accessToken)
          localStorage.setItem("userId",res.data.others._id)
          localStorage.setItem("username",res.data.others.username)
        })
    } catch (error) {
      console.log(error);
    }
  };

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
      await signIn("google",{callbackUrl:'/home'});
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
            placeholder="Email"
            required
            ref={loginEmail}
          />
          <input
            type="password"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="Password"
            required
            ref={loginPassword}
          />

          <button onClick={loginUser}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            {" "}
            Login
          </button>
          <p className="text-red-600 text-[16px] mb-4"></p>
        </form>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link
          className="block text-center text-blue-500 hover:underline mt-2"
          href="/signup"
        >
          Create a new account
        </Link>
      </div>
    </div>
  );
};

export default login;

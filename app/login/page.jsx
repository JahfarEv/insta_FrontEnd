"use client";
import React, { useEffect, useRef, useState,useContext } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import GoogleButton from "react-google-button";
import { signIn, useSession } from "next-auth/react";
import useAuthStore from "../zustand/authStore";
import { useUserContext } from "../providers/userContext";
import { toast } from "sonner"



const Signin = () => {
  const router = useRouter();
const {setAuthUser} = useUserContext()
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
  }, [session, setGoogleEmail, setGoogleProfile, setGoogleUserName]);

  const handleGoogleSign = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashbord" });
      const userData = {
        username: googleUserName,
        email: googleEmail,
        profile: googleProfile,
      };
      const response = await axios.post(
        "https://www.api.sharescape.site/api/user/new/google-user",
        userData
      );
      console.log(response);
      if (response === 200) {
        localStorage.setItem("token", session.id_token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const inputUsername = userRef.current.value;
    const inputPassword = passwordRef.current.value;

    try {
      const data = {
        email: inputUsername,
        password: inputPassword,
      };
      const response = await axios.post(
        "https://www.api.sharescape.site/api/user/signin",
        data
      );
      if (response) {
        router.push("/dashbord");
        toast("login successfully")
        localStorage.setItem("jwt", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setAuthUser(response.data.user)
      }
      else{
        toast('email or password not valid')
      }
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
            ref={userRef}
          />
          <input
            type="password"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="Password"
            required
            ref={passwordRef}
          />

          <button
            onClick={handleLogin}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            {" "}
            Login
          </button>
          <Link href="/login/forget-password">forget password</Link>
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

export default Signin;

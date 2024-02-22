"use client"
import React from 'react'
import Link from 'next/link'
import GoogleButton from 'react-google-button'
import {signIn,useSession} from 'next-auth/react'

const signup = () => {
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const email = e.target[0].value;
    const fullname = e.target[1].value;
    const username = e.target[2].value;
    const password = e.target[3].value;

    console.log(email,fullname,username,password);
    const {data:session,mutate}=useSession()
    const {
      googleUserName,
      setGoogleUserName,
      setGoogleEmail,
      googleEmail,
      setGoogleProfile,
      googleProfile,
    }=useAuthStore();
    useEffect(() => {
      if (session && session.user) {
        setGoogleUserName(session.user.name);
        setGoogleEmail(session.user.email);
        setGoogleProfile(session.user.image);
      }
    }, [session]);
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="bg-none p-8 rounded shadow-md w-96 border-spacing-3 ">
      <h1 className="text-4xl text-center font-semibold mb-8">Share scape</h1>
      <form >
       <GoogleButton onClick={signIn('google')} className='w-full'/>
         
        
        <div className="text-center text-gray-500 mt-4 mb-3">- OR -</div>
        <input
          type="text"
          className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
          placeholder="Email"
          required
        />
        <input
          type="text"
          className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
          placeholder="Full Name"
          required
        />
        <input
          type="text"
          className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
          placeholder="Username"
          required
        />
        <input
          type="password"
          className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
          placeholder="Password"
          required
        />
        <button
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
  )
}

export default signup

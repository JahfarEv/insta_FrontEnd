
import React from 'react'
import Link from 'next/link'

const login = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="bg-none p-8 rounded shadow-md w-96 border-spacing-3 ">
      <h1 className="text-4xl text-center font-semibold mb-8">Share scape</h1>
      <form >
      <button
          type="submit"
          className="w-full bg-gray-500 bg-opacity-50 text-white py-2 rounded-md hover:bg-gray-600 mb-3"
        >
          {" "}
          Login with Google
        </button>
        <div className="text-center text-gray-500 mt-4 mb-3">- OR -</div>
        <input
          type="text"
          className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
          placeholder="Email"
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
  )
}

export default login



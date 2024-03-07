import React from 'react'
import dashbord from './dashbord/(home)/page'

const page = () => {
  return (
    <div>
    
    </div>
  )
}

export default page




// "use client"
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import React,{useRef, useState} from 'react'

// const page = () => {
// const [error,setError] = useState()
// const [datas,setDatas] = useState({})
// const route = useRouter()
 
//   const handleChange = (e)=>{
// setDatas({...datas, [e.target.name]: e.target.value})

//   }
//   const handleSubmit = async()=>{
// const email = datas.email
// const password = datas.password
//   }


// if(!isValidEmail){
//     setError("Email is invalid")
//     return;
//   }
//   if(!password || password.length<6){
//     setError("Password is invalid")
//     return;
//   }
  

//     try {
//       const response =  fetch("http://localhost:5000/api/user/signin", {
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           password,
//           email,
//         }),
//       });
//       const data = await response.json();
//       console.log(data);
//       if (data.error) {
//         console.log(data.error);
//       } else {
//         localStorage.setItem("jwt", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));
// console.log("success");
// return router.push("/dashbord")
//       }
      
//     } catch (err) {
//       console.error(err);
//     }
//   ;
//   }
  
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="bg-none p-8 rounded shadow-md w-96 border-spacing-3 ">
//         <h1 className="text-4xl text-center font-semibold mb-8">Share scape</h1>
//         <form onSubmit={handleSubmit}>
//           {/* <GoogleButton
//             // onClick={handleGoogleSign}
//             style={{ width: "315px", border: "rounded" }}
//           /> */}

//           <div className="text-center text-gray-500 mt-4 mb-3">- OR -</div>
//           <input
//             type="text"
//             className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
//             placeholder="Email"
//             // value={email}
//             // onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
//             placeholder="Password"
//             // value={password}
//             // onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
            
            
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
//           >
//             {" "}
//             Login
//           </button>
//           <p className="text-red-600 text-[16px] mb-4"></p>
//         </form>
//         <div className="text-center text-gray-500 mt-4">- OR -</div>
//         {/* <Link
//           className="block text-center text-blue-500 hover:underline mt-2"
          
//         >
//           Create a new account
//         </Link> */}
//       </div>
//     </div>
//   )

//   }
  
// export default page

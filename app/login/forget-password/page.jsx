"use client"
import React,{useState,useContext,} from 'react'
import { useRouter } from 'next/navigation'
const Reset  = ()=>{
    const router = useRouter()
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch('/reset-password',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               router.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }

    
  

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="bg-none p-8 rounded shadow-md w-96 border-spacing-3 ">
      <h1 className="text-4xl text-center font-semibold mb-8">Forget password</h1>
      <form>
       

     
        <input
          type="text"
          className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          
        />
       

        <button
          
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          onClick={()=>PostData()}
        >
          {" "}
          reset password
        </button>
        <p className="text-red-600 text-[16px] mb-4"></p>
      </form>
      
      
    </div>
  </div>
  )
  }

export default Reset

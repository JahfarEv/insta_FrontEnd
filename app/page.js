"use client"
import Signin from "./login/page";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
const page = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  
    if (!storedUser) {
      router.push("/");
    } else {
      router.push("/login");
    }
  }, [router]);
  return (
   
   <div className="flex items-center justify-center h-screen">
   <Signin/>
</div>

    
  );
};

export default page;

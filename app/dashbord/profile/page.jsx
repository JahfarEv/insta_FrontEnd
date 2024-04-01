"use client";
import { Footer } from "@/components/Footer";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Profile = () => {
  const router = useRouter()
  const [mypics, setMypics] = useState([]);
  const [profile,setProfile] = useState([])
  const [image,setImage] = useState("")
  const [url,setUrl] = useState(undefined)
  const user = JSON.parse(window.localStorage.getItem("user"));
  const userId = user._id

  useEffect(() => {
    fetch("http://localhost:5000/api/post/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setMypics(result.mypost);
        console.log(result);
      });
  }, []);


  const uploadPic = ()=>{
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
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  
  
  const updateUser = async ()=>{
    await fetch(`http://localhost:5000/api/user/profile/${userId}`,{
      method:"put",
      headers:{
        "Content-Type":"application/json"
   },
   body:JSON.stringify({
   
    pic: url,
   })
    }).then(res=>
      res.json()).then(data=>{
        console.log(data);
      })
      router.replace("/dashbord")
  }
  
  const postData = async ()=>{
    if(image){
      uploadPic()
    }
    else{
      updateUser()
    }
  }

useEffect(()=>{


  fetch(`http://localhost:5000/api/user/userbyid/${userId}`,{
    method:"get",
    headers:{
      "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
    }
  }).then((res)=>res.json())
  .then((result)=>{
    setProfile(result.user)
  })
},[userId])

useEffect(()=>{
if(url){
  updateUser()
}
},[updateUser])

  return (
    <>
   <div className="flex flex-col md:flex-row justify-evenly items-center mb-5">
  <div className="flex justify-items-start mb-4 md:mb-0">
    <Image
      src={profile ? profile.pic : "loading.."}
      alt="profilepic"
      className="rounded-full w-[250px] h-[250px]"
      width={250} height={250}
    />
  </div>

  <div className="md:ml-8">
  <div className="flex">
    <h3 className="text-xl font-semibold">{profile?.name}</h3>
    <div className="flex  mb-3 ml-42">
  <label htmlFor="upload" className=" hover:bg-blue-700 text-white px-2 rounded-lg cursor-pointer text-center">
    edit profile
  </label>
  <input
    id="upload"
    type="file"
    className="hidden"
    onChange={(e) => setImage(e.target.files[0])}
  />
  <div
          onClick={()=>postData()}
            type="submit"
            className="  text-white rounded-md hover:bg-blue-600"
          >
            {" "}
            Submit
          </div> 
</div>

    </div>
    <div className="flex flex-col md:flex-row items-center justify-center">
      <div className="flex flex-col md:mr-8">
        <div className="flex flex-row justify-between">
          <h6 className="mr-3">{mypics.length} posts</h6>
          <h6 className="mr-3">{profile.followers ? profile.followers.length : 0} followers</h6>
          <h6>{profile.following ? profile.following.length : 0} following</h6>
        </div>
        <p className="text-sm font-light">{profile?.email}</p>
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
              <Image
                key={item._id}
                width={400} height={300}
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

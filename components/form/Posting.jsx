"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const userId = localStorage.getItem("username");
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const Posting = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      fetch("http://localhost:5000/api/post/new/post", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
        
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
          } else {
            router.push("/dashbord");
            console.log("success");
          }
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    }
  }, [url]);

  const postDetails = () => {
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

  return (
    <div className="card input-filed mx-auto max-w-500px p-20 text-center border w-1/2">
    <div
      className="grid w-full max-w-sm items-center gap-1.5"
      onChange={(e) => setImage(e.target.files[0])}
    >
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
    <textarea
      type="text"
      placeholder="title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full mb-4 rounded mt-3"
    />
    {/* <div>
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full mb-4 h-[30px] rounded"
      />
    </div> */}
    <button
      className="btn waves-effect waves-light bg-gray-500 text-white hover:bg-blue-600 focus:bg-blue-600 py-2 px-4 rounded-lg"
      onClick={() => postDetails()}
    >
      Submit post
    </button>
  </div>
);
};

export default Posting;
"use client";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRegFaceSmile } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { GoBookmark } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
const user =JSON.parse(window.localStorage.getItem("user")) 

const Post = ({ postIndex }) => {
  const router = useRouter()
  const [post, setPost] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/post/allpost",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );
        if (response.status === 200) {
          setPost(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, []);

  //likes

  const likePost = async (id) => {
     {
      try {
        
    
        const response = await fetch("http://localhost:5000/api/post/like", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            postId: id
          }),
        });
    
        if (!response.ok) {
          throw new Error("Failed to like the post.");
        }
    
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error(error.message);
      }
    };
    
  }
  //unlike
  const unlikePost = (id) => {
    fetch("http://localhost:5000/api/post/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };

  //comments
const makeComment = (text,postId)=>{
fetch('http://localhost:5000/api/post/comment',{
  method:"put",
  headers:{
    "Content-Type":"application/json",
    "Authorization":"Bearer "+localStorage.getItem("jwt")
  },
  body:JSON.stringify({
    postId,
    text
  })
}).then(res=>res.json())
.then(result=>{
  console.log(result);
  const newData = post.map(item=>{
    if(item._id==result._id){
      return result
    }
    else{
      return item
    }

  })
  setPost(newData)
}).catch(err=>{
  console.log(err);
})
}

//delete post

const deletePost = (postId) => {
  fetch(`http://localhost:5000/api/post/deletepost/${postId}`, {
    method: 'DELETE',
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt")
    }
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Failed to delete post: ${res.status}`);
    }
    return res.json();
  })
  .then(result => {
    console.log(result);
    // Update UI by filtering out the deleted post
    const newData = post.filter(item => item._id !== result._id);
    setPost(newData);
  })
  .catch(error => {
    console.error('Error deleting post:', error);
    // Handle error
  });
}

//profile
const handleProfile = (userId)=>{
  router.push(`/dashbord/profile/${userId}`)
}

  return (
    <div className="flex flex-col w-full col-span-2 space-y-5">
      <div>
        {post.map((item) => (
          <div className="flex flex-col w-full border-none" key={item._id}>
            <div className="flex items-center justify-between w-full p-2">
              <div className="flex space-x-2 justify-center items-center">
                <div className="w-10 h-10 bg-black border-2 rounded-full" />
                <h1 onClick={()=>handleProfile(item?.postedBy._id)} className="font-semibold cursor-pointer   ">{item?.postedBy?.name}</h1>
              </div>
              <div className="w-3 ">
              {item.postedBy._id == user._id
              && <MdDelete onClick={()=>deletePost(item._id)}/>

              } 
              
              </div>
            </div>

            <div className="aspect-auto w-full h-full">
              <img src={item.photo} alt="" />
            </div>

            <div className="flex justify-between p-2 text-lg">
              <div className="flex space-x-2">
                <div>
                  <FaRegHeart
                    className="cursor-pointer"
                    size={25}
                    onClick={() => {
                      likePost();
                    }}
                  />
                </div>
                <div>
                  <FaRegComment size={25} />
                </div>
                <div>
                  <FaTelegramPlane size={25} />
                </div>
              </div>
              <div>
                <GoBookmark size={25} />
              </div>
            </div>
            <div className="px-2">{item.likes.length} likes</div>
            <div className="px-2">
            {item.comments.map(record=>{
              return(
                <h6><span className="font-semibold">{record.postedBy.name }</span> {record.text}</h6>
              )
            })}
             
            </div>
            <div className="px-2">3 hours ago</div>
            <div className="flex px-2 mt-1 items-center space-x-3 py-4 border-t border-gray-200">
              <div>
                <FaRegFaceSmile className="text-xl" />
              </div>
              <form
                onSubmit={(e) =>{ e.preventDefault()
                makeComment(e.target[0].value,item._id)}}
                className="flex w-full px-2"
              >
                <div className="w-full">
                  <input
                    type="text"
                    name={`comment ${postIndex}`}
                    id={`comment ${postIndex}`}
                    className="w-full outline-none"
                    placeholder="Add a comment..."
                  />
                </div>

                <div>
                  <button className="text-blue-600 font-semibold text-sm">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;

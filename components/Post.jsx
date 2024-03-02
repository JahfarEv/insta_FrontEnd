"use client";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRegFaceSmile } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { GoBookmark } from "react-icons/go";
import axios from "axios";

const Post = ({ postIndex }) => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/post/get-post"
        );
        if (response.status === 200) {
          setPost(response.data.data.post);
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, []);
  return (
    <div className="flex flex-col w-full col-span-2 space-y-5">
      <div>
        {post.map((item) => (
          <div className="flex flex-col w-full border-none">
            <div className="flex items-center justify-between w-full p-2">
              <div className="flex space-x-2 justify-center items-center">
                <div className="w-10 h-10 bg-black border-2 rounded-full" />
                <div>{item.user.username}</div>
              </div>
              <div className="w-4 select-none">
                <BsThreeDots />
              </div>
            </div>

            <div className="aspect-square w-full h-full">
              <img src={item.image} alt="" />
            </div>

            <div className="flex justify-between p-2 text-lg">
              <div className="flex space-x-2">
                <div>
                  <FaRegHeart
                    size={25}
                    className="text-black cursor-pointer hover:text-black/50"
                  />
                </div>
                <div>
                  <FaRegComment
                    size={25}
                    className="text-black cursor-pointer hover:text-black/50"
                  />
                </div>
                <div>
                  <FaTelegramPlane
                    size={25}
                    className="text-black cursor-pointer hover:text-black/50"
                  />
                </div>
              </div>
              <div>
                <GoBookmark
                  size={25}
                  className="text-black cursor-pointer hover:text-black/50"
                />
              </div>
            </div>
            <div className="px-2">1000 likes</div>
            <div className="px-2">
              <div className="flex flex-col space-y-1">
                {new Array(3).fill(0).map((_, i) => (
                  <div key={i} className="flex space-x-2">
                    <div className="font-medium">username </div>
                    <div>comment {i + 1}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-2">3 hours ago</div>
            <div className="flex px-2 mt-1 items-center space-x-3 py-4 border-t border-gray-200">
              <div>
                <FaRegFaceSmile className="text-xl" />
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
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

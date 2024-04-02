"use client";
import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { LiaBookmark } from "react-icons/lia";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/providers/userContext";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  cn,
} from "@nextui-org/react";
const user = JSON.parse(window.localStorage.getItem("user"));
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const Post = ({ postIndex }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { authUser } = useUserContext();
  const router = useRouter();
  const [post, setPost] = useState([]);
  const [commentPost, setCommentPost] = useState([]);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    if (authUser) {
      getPost(); // to fetch post
    }
  }, [authUser]);

  const getPost = async () => {
    try {
      const response = await axios.get(
        "http://www.api.sharescape.site/api/post/allpost",
        {
          headers: {
            Authorization: "Bearer " + (typeof window !== 'undefined' ? localStorage.getItem("jwt") : ''),

          },
        }
      );
      if (response.status === 200) {
        setPost(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPostbyId = async (id) => {
    try {
      const response = await axios.get(
        `http://www.api.sharescape.site/api/post/postby/${id}`,
        {
          headers: {
            Authorization: "Bearer " + (typeof window !== 'undefined' ? localStorage.getItem("jwt") : ''),
          },
          body: JSON.stringify({
            postId: id,
          }),
        }
      );
      if (response.status === 200) {
        setCommentPost(response.data.postbyid);
        console.log(response);
        const mappedData = response.data?.postbyid?.comments?.map(
          (item) => item
        );
        setComment(mappedData);
      } else {
        setError("Failed to fetch post");
      }
    } catch (error) {
      console.error(error);
      setError("Network error");
    }
  };
  // likes

  const likePost = (id) => {
    fetch("http://www.api.sharescape.site/api/post/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (typeof window !== 'undefined' ? localStorage.getItem("jwt") : ''),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        getPost();
        console.log(result);
      });
  };
  //unlike
  const unlikePost = (id) => {
    fetch("http://www.api.sharescape.site/api/post/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (typeof window !== 'undefined' ? localStorage.getItem("jwt") : ''),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        getPost();
      });
  };

  //comments
  const makeComment = (text, postId) => {
    fetch("http://www.api.sharescape.site/api/post/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (typeof window !== 'undefined' ? localStorage.getItem("jwt") : ''),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = post.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setPost(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  //delete post

  const deletePost = (postId) => {
    fetch(`http://www.api.sharescape.site/api/post/deletepost/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + (typeof window !== 'undefined' ? localStorage.getItem("jwt") : ''),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to delete post: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        const newData = post.filter((item) => item._id !== result._id);
        setPost(newData);
      })
      router.push("/dashbord")
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  //profile
  const handleProfile = (userId) => {
    router.push(`/dashbord/profile/${userId}`);
  };

  return (
    <div className="flex flex-col w-full col-span-2 space-y-5">
      <div>
        {post.map((item) => (
          <div className="flex flex-col w-full border-none" key={item._id}>
            <div className="flex items-center justify-between w-full pb-2">
              <div className="flex justify-center items-center">
                <div className="  border-2 rounded-full" />
                <Image
                  src={item?.pic}
                  alt="itemphoto"
                  width={35}
                  height={35}
                  className="rounded-full mr-2"
                />
                <h1
                  onClick={() => handleProfile(item?.postedBy._id)}
                  className="font-semibold cursor-pointer   "
                >
                  {item?.postedBy?.name}
                </h1>
              </div>

              <div className="w-3 cursor-pointer ">
              {item.postedBy._id == user?._id && (
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered">
                      <BsThreeDots />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    variant="faded"
                    aria-label="Dropdown menu with icons"
                    className="bg-gray-800 text-white rounded-md"
                  >
                    <DropdownItem key="new">New file</DropdownItem>

                    <DropdownItem key="edit">Edit file</DropdownItem>
                    
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        onClick={() => deletePost(item._id)}
                      >
                        Delete
                      </DropdownItem>
                    
                  </DropdownMenu>
                </Dropdown>
                )}
              </div>
            </div>

            <div className="aspect-w-4 aspect-h-3 sm:aspect-w-16 sm:aspect-h-9 md:aspect-w-3 lg:aspect-w-4 xl:aspect-w-3/2">
              <Image
                src={item.photo}
                alt="photos"
                className="w-full h-full object-cover rounded-lg border"
                width={500}
                height={200}
              />
            </div>

            <div className="flex justify-between p-2 text-lg">
              <div className="flex space-x-2">
                <div>
                  {item.likes.includes(authUser._id) ? (
                    <IoIosHeart
                      className="cursor-pointer text-red-700"
                      size={25}
                      onClick={() => {
                        unlikePost(item._id);
                      }}
                    />
                  ) : (
                    <FaRegHeart
                      className="cursor-pointer"
                      size={25}
                      onClick={() => {
                        likePost(item._id);
                      }}
                    />
                  )}
                </div>
                <div>
                  <div onClick={onOpen}>
                    <FaRegComment
                      size={25}
                      onClick={() => getPostbyId(item._id)}
                      className="cursor-pointer"
                    />
                  </div>
                  <Modal
                    isOpen={isOpen}
                    onClick={() => getPostbyId()}
                    onOpenChange={onOpenChange}
                    className="w-full md:w-[950px] h-[500px] mb-[40px] border bg-neutral-800 "
                  >
                    <div></div>
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <div>
                            <div>
                              <ModalBody className="flex flex-row gap-4 sm:gap-8 lg:gap-10">
                                <div className="basis-1/2">
                                  <div>
                                    <div className="aspect-auto w-full h-[470px]">
                                      <Image
                                        src={commentPost.photo}
                                        alt="commentsImage"
                                        className="w-full h-full object-cover rounded-lg border"
                                        width={300}
                                        height={470}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="basis-1/2">
                                  {comment.map((cmt) => (
                                    <div
                                      key={cmt._id}
                                      className="flex items-start px-2 text-white"
                                    >
                                      {/* Profile Picture and Username */}
                                      <div className="flex items-center">
                                        <Image
                                          src={cmt.postedBy.pic}
                                          alt="Profile Picture"
                                          className="rounded-full w-10 h-10 md:w-12 md:h-12 mx-2 mb-2"
                                          width={30}
                                          height={30}
                                        />
                                        <div className="text-left">
                                          <h1 className="font-bold">
                                            {cmt.postedBy.name}
                                          </h1>
                                        </div>
                                      </div>

                                      <div className="flex-1 text-right ">
                                        <h1>{cmt.text}</h1>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </ModalBody>
                            </div>

                            <ModalFooter>
                              <Button
                                color="danger"
                                variant="light"
                                onClick={onClose}
                              >
                                Close
                              </Button>
                            </ModalFooter>
                          </div>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </div>

                <div>
                  <FaTelegramPlane size={25} />
                </div>
              </div>
              <div>
                <LiaBookmark size={25} />
              </div>
            </div>
            <div className="px-2">{item?.likes?.length} likes</div>
            <div className="flex px-2 font-semibold">
              <div
                onClick={() => handleProfile(item?.postedBy._id)}
                className="cursor-pointer"
              >
                {item.postedBy.name}
              </div>
              <h3 className="px-2 font-normal">{item.title}</h3>
            </div>
            <div
              className="text-gray-500 font-light px-2 cursor-pointer"
              onClick={onOpen}
            >
              <h4 onClick={() => getPostbyId(item._id)}>
                View all {item?.comments?.length} comments
              </h4>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                makeComment(e.target[0].value, item._id);
              }}
              className="flex w-full px-2"
            >
              <div className="w-full">
                <input
                  type="text"
                  name={`comment ${postIndex}`}
                  id={`comment ${postIndex}`}
                  className="w-full outline-none bg-transparent font-medium"
                  placeholder="Add a comment..."
                />
              </div>

              <div></div>
            </form>
            <div className="flex px-2 mt-3 items-center space-x-3 py-4 border-t border-gray-500"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;

"use client";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { GoBookmark } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
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
import { record } from "zod";
import Link from "next/link";

const Post = ({ postIndex }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();
  const [post, setPost] = useState([]);
  const [commentPost, setCommentPost] = useState([]);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState([]);
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
  const getPostbyId = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/post/postby/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            postId: id,
          }),
        }
      );
      if (response.status === 200) {
        setCommentPost(response.data.postbyid);
        console.log(response.data.postbyid);
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
  console.log(comment);
  //likes

  // const likePost = (id) => {
  //   fetch("http://localhost:5000/api/post/like", {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //     body: JSON.stringify({
  //       postId: id,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {});
  // };
  // //unlike
  // const unlikePost = (id) => {
  //   fetch("http://localhost:5000/api/post/unlike", {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //     body: JSON.stringify({
  //       postId: id,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //     });
  // };

  //comments
  const makeComment = (text, postId) => {
    fetch("http://localhost:5000/api/post/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
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
    fetch(`http://localhost:5000/api/post/deletepost/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
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
            <div className="flex items-center justify-between w-full p-2">
              <div className="flex space-x-2 justify-center items-center">
                <div className="  border-2 rounded-full" />
                <img
                  src={item?.pic}
                  width={50}
                  height={50}
                  className="rounded-full"
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
                  <MdDelete onClick={() => deletePost(item._id)} />
                )}
              </div>
            </div>

            <div className="aspect-auto w-full h-[500px]">
              <img
                src={item.photo}
                alt=""
                className="w-full h-full object-cover rounded-lg border"
              />
            </div>

            <div className="flex justify-between p-2 text-lg">
              <div className="flex space-x-2">
                <div>
                  {post.likes !== user._id ? (
                    <FaRegHeart
                      className="cursor-pointer"
                      size={25}
                      onClick={() => {
                        likePost(item._id);
                      }}
                    />
                  ) : (
                    <FaRegHeart
                      className="cursor-pointer"
                      size={25}
                      onClick={() => {
                        unlikePost(item._id);
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
                    onClick={() => getPostbyId(id)}
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
                                      <img
                                        src={commentPost.photo}
                                        alt=""
                                        className="w-full h-full object-cover rounded-lg border"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="basis-1/2">
                                  {comment.map((cmt) => (
                                    <h1 key={cmt._id} >{cmt.text}</h1>
                                  ))}
                                </div>
                              </ModalBody>
                            </div>

                            <ModalFooter>
                              <Link href="/dashbord">
                                <Button
                                  color="danger"
                                  variant="light"
                                  onPress={onClose}
                                >
                                  Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                  Action
                                </Button>
                              </Link>
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
              {/* <div>
                <GoBookmark size={25} />
              </div> */}
            </div>
            <div className="px-2">{item?.likes?.length} likes</div>

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
                  className="w-full outline-none"
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

"use client";
import React, { useEffect, useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import axios from "axios";
import { data } from "autoprefixer";

const page = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [commentPost, setCommentPost] = useState(null);
  
  const getPostbyId = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/post/postby/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      if (response.status === 200) {
        const {data} = response.data.postbyid
        // setCommentPost(response.data.postbyid); 
        console.log(response.data.postbyid);
      } else {
        setError("Failed to fetch post");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
console.log(commentPost);
  return (
    <div >
      <Modal
      onClick={()=>getPostbyId(id)}
        isOpen={true}
        onOpenChange={onOpenChange}
        className="w-full md:w-[950px] h-[500px] mb-[40px] border text-white "
      >
        <ModalContent>
          {(onClose) => (
            <>
              <div>
                
                  <div >
                    <ModalHeader className="flex flex-col gap-1">
                     
                    </ModalHeader>
                    <ModalBody className="flex flex-row gap-4 sm:gap-8 lg:gap-10">
                      <div className="basis-1/2">
                        <div>
                          <div className="aspect-auto w-full h-full">
                            <img src={data?.photo} className="w-[200px] h-[200px]" alt="" />
                          </div>
                          <div className="basis-1/2">
                            <div className="px-2">
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </ModalBody>
                  </div>
           

                <ModalFooter>
                <Link href="/dashbord">
                  <Button color="danger" variant="light" onPress={onClose}>
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
  );
};

export default page;
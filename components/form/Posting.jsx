"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const userId = localStorage.getItem("username");
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const Posting = () => {
  const {  onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const [isOpen, setIsOpen] = useState(true);

  const onCloseModal = () => {
    setIsOpen(false);
  };
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
          body,
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
    <div className="flex justify-center items-center h-screen ">
      <Modal
        isOpen={isOpen} onOpenChange={setIsOpen}
        
        className="w-full md:max-w-[700px] h-[400px] mb-[100px] border bg-neutral-800"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <div>
                <ModalHeader className="flex justify-between items-center gap-2">
                  <div className="flex flex-col items-center">
                    <h1 className="text-center">Create</h1>
                  </div>
                  <div className="flex flex-col items-center">
                    <h1 className="text-center">Create new post</h1>
                  </div>
                  <span>Share</span>
                </ModalHeader>

                <ModalBody className="flex flex-row gap-4 sm:gap-8 lg:gap-10">
                  <div className="w-1/2">
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src="https://via.placeholder.com/400"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-1/2 flex justify-center items-center">
                    hello
                  </div>
                </ModalBody>
                <ModalFooter>
                <Button color="danger" variant="light" onPress={onCloseModal}>
                    Close
                  </Button>
                </ModalFooter>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>

    /* <div
        className="grid w-full max-w-sm items-center gap-1.5"
        onChange={(e) => setImage(e.target.files[0])}
      >
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" />
      </div>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 h-[30px] rounded mt-3"
      />
      <div>
        <input
          type="text"
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full mb-4 h-[30px] rounded"
        />
      </div>
      <button
        className="btn waves-effect waves-light bg-gray-500 text-white hover:bg-blue-600 focus:bg-blue-600 py-2 px-4 rounded-lg"
        onClick={() => postDetails()}
      >
        Submit post
      </button> */
    // </div>
  );
};

export default Posting;

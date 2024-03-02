import axios from "axios";

export const Axios = axios.create({
  baseURL: process.env.LOCALHOST || "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});
console.log(Axios);
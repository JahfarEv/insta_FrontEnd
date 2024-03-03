import axios from "axios";

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Axios = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    ...(typeof window !== "undefined" && {
      Authorization: localStorage.getItem("token"),
    }),
  },
});

export default Axios;
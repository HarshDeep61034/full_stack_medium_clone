import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../index.css";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import Cookies from "js-cookie";
import { LogedNavbar } from "../components/LogedNavbar";
export const Blog = () => {
  const { id } = useParams();
  const [markdown, setMarkDown] = useState("# Loading...");
  useEffect(() => {
    const token = Cookies.get("token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };

    const api_url = import.meta.env.VITE_REACT_APP_API_URL;

    axios
      .get(`${api_url}/api/v1/blog/${id}`, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        setMarkDown(response.data.content);
      })
      .catch((error) => {
        console.log("Error : " + error);
      });
  }, []);

  return (
    <>
      <LogedNavbar route="/home" />
      <ReactMarkdown
        className="md:w-[50vw] relative my-24 text-md md:text-xl mx-auto"
        children={markdown}
        rehypePlugins={[rehypeRaw]}
      />
    </>
  );
};

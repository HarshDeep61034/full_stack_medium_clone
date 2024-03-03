import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Blogcard } from "../components/Blogcard";
import { useEffect, useState } from "react";
import axios from "axios";
export const Main = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const api_url = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${api_url}/blogs`)
      .then(function (response) {
        setError("");
        setBlogs(response.data);
        console.log(response);
      })
      .catch(function (error) {
        setError(error.response.data.message);
        console.log("Error : " + error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="h-[200vh]">
      <Navbar />
      <Hero />
      {loading
        ? "Loading..."
        : blogs.map((blog) => (
            <Blogcard
              title={blog.title}
              createdAt={blog.createdAt}
              likes={blog.likes}
              published={blog.published}
              content={blog.content}
              id={blog.id}
            />
          ))}
    </div>
  );
};

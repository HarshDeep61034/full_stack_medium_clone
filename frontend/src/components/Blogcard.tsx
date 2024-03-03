import { AiOutlineLike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
interface BlogcardProps {
  title: string;
  createdAt: string;
  likes: number;
  content: string;
  id: string;
  published: boolean;
}
export const Blogcard = ({
  title,
  createdAt,
  likes,
  content,
  published,
  id,
}: BlogcardProps) => {
  const data = {
    username: "HarshDeep",
    title: "How to create your own transcoding service from scartch",
    date: "Feb 5, 2024",
  };
  const navigate = useNavigate();
  function handlenavigate() {
    navigate(`/blog/${id}`);
  }
  return (
    <div className="md:p-4 md:w-[50vw] border-[#f3f3f3] border-b-2 mx-2 my-4 text-sm md:text-xl p-2">
      
      <div className="flex mx-1 md:mx-4 items-center justify-between">
        <div className="flex text-base items-center">
          <div className="w-7 mr-4  h-7 text-white bg-green-400 rounded-full flex justify-center items-center text-xl font-bold">
            {data.username.slice(0,1)}
          </div>
          {data.username}
        </div>
        <div className="text-base text-slate-600 flex"><p className="hidden md:block">Published on : </p><p className="md:hidden">Date: </p>  {createdAt.slice(0, 9)}</div>
      </div>

      <div className="justify-between items-center text-sm md:text-xl flex mx-2 rounded-xl">
        <div className="w-2/3 ml-2">
          <div onClick={handlenavigate} className="cursor-pointer">
            {" "}
            <p className="font-semibold my-2 md:text-2xl">{title}</p>
            <p className="my-2 hidden font-serif md:block">
              {content.slice(0, 100) + "..."}
            </p>
          </div>
          <p className="text-slate-500 flex">
            {likes}
            <AiOutlineLike className=" cursor-pointer relative top-[2px] left-1" />{" "}
          </p>
        </div>
        <div>
          <img
            onClick={handlenavigate}
            className="w-24 h-24 md:w-52 rounded-md cursor-pointer"
            src="https://img-getpocket.cdn.mozilla.net/296x148/filters:format(jpeg):quality(60):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fd64b2b9e-a090-4080-a4e0-66a8725fb66d.jpeg"
          />
        </div>
      </div>
    </div>
  );
};

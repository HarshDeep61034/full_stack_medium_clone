import { useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { GoPencil } from "react-icons/go";
export const LogedNavbar = ({ route, handlePublish }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState(false);

  function handlenavigation(){
    if(route == "/home"){
      navigate("/blog/new");
    }
    else if(route == "/blog/new"){
     handlePublish();
    }
    else if(route == "/blog/update"){
      navigate("/profile")
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-20 z-50 bg-white">
      <div  className="flex justify-between items-center h-20 border-b-[1px] border-black z-40 bg-white">
        <div onClick={()=>navigate("/home")} className="font-semibold ml-4 text-3xl font-serif flex">
          <div className="bg-black w-8 h-8 rounded-full mx-[1px]"></div>
          <div className="bg-black w-[13px] h-8 rounded-[50%] mx-[1px]"></div>
          <div className="bg-black w-[7px] h-8 rounded-[50%] mx-[1px]"></div>
        </div>

        <div className="flex justify-around text-3xl  text-[#b6b5b5]">
          <div onClick={handlenavigation} className="text-base mx-3 cursor-pointer px-4 py-1 text-white rounded-2xl bg-[#1a8917] hover:bg-[#22a21d]">
            {route == "/blog/new" && "Publish"}
            {route == "/home" && (<GoPencil className="my-1"/> )}
            {route == "/blog/update" && "Update"}
          </div>
          <CiSearch className={route == "/blog/new" ? "hidden" : "md:hidden"} onClick={() => setSearch((prev) => !prev)} />
          <IoNotificationsOutline className="mx-2" />
          <CgProfile onClick={()=>navigate("/profile")} className="mx-3"/>
        </div>
      </div>
      {search && (
        <div className="w-full flex justify-center my-4">
          <input
            className="my-2 p-2 rounded-2xl border-[1px] outline-none border-black"
            type="text"
            placeholder="Search Blogs"
          />
        </div>
      )}
    </div>
  );
};

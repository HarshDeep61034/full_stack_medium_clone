import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center h-20 border-b-[1px] border-black bg-[#f9f108] z-50">
      <div className="font-semibold ml-4 text-3xl font-serif">Medium</div>
      <div className="flex">
        <button onClick={()=>navigate("/signin")} className="hidden md:block hover:underline mx-2">Sign in</button>
        <button onClick={()=>navigate("/signup")} className="px-3 py-2 bg-[#191919] text-white mr-3 rounded-3xl text-">
          Get started
        </button>
      </div>
    </div>
  );
};

export default Navbar;

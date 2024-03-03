export const Hero = () => {
  return (
    <div className="w-[100vw] bg-[#f9f108] flex justify-around h-[60vh] border-b-[1px] border-black">
      <div className="relative top-32">
        <div className="text-7xl ml-7 my-6 font-semibold font-serif">Stay Curious.</div>
        <div className="text-2xl my-6 text-left m-6">
          Discover stories, thinking, and <br/>  expertise from writers on any topic.
        </div>
        <button  className="px-9 my-6 py-2 text-xl bg-[#191919] text-white rounded-3xl ml-4">
          Start Reading
        </button>
      </div>
      <div>
        <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWlkdTRrZjV4b3E4Ym81dW16aTZkZnR0Ym50dnNndXNrcjNjcXB3OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VUasOeEum66DIRZqT4/giphy.gif" alt="" />
      </div>
    </div>
  );
};

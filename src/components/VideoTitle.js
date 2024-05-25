import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className=" md:pt-80 md:pl-10 absolute text-white">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="w-[100%] md:w-[20%] text-ellipsis line-clamp-3 hover:w-[85%] p-1  overflow-hidden">
        {overview}
      </p>
      <div>
        <button className="border bg-black text-white p-1 px-6 mr-2 mt-2 hover:bg-gray-700  rounded-lg">
          {" "}
          Play
        </button>
        <button className="border bg-black text-white p-1 px-6 hover:bg-gray-700  rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;

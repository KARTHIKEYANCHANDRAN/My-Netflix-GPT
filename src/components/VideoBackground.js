import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../custom_hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const finaltrailerstore = useSelector((store) => store?.movies?.trailerVideo);

  useMovieTrailer(movieId);

  return (
    <div>
      <iframe
        className="w-[100%] aspect-video -mt-40 "
        src={
          "https://www.youtube.com/embed/" +
          finaltrailerstore?.key +
          "?modestbranding=1&autoplay=1&mute=1&controls=0&rel=0&showinfo=0"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;

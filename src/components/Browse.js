import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../custom_hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../custom_hooks/usePopularMovies";
import useTopRatedMovies from "../custom_hooks/useTopRatedMovies";
import useUpcomingMovies from "../custom_hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  const gptSearch = useSelector((store) => store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div className=" scroll-smooth">
      <Header />
      {gptSearch ? (
        <GptSearch />
      ) : (
        < div className="bg-black pb-[1%]">
          {" "}
          <MainContainer /> <SecondaryContainer />{" "}
        </div>
      )}
    </div>
  );
};

export default Browse;

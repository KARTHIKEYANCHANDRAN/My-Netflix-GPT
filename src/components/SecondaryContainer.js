import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  //console.log(movies.nowPlayingMovies);

  return (
    <div className=" mt-32 md:-mt-32">
      <MovieList
        title={"Newly Added Movies"}
        movies={movies.nowPlayingMovies}
      />

      <div>
        <MovieList
          title={"Top Rated Movies"}
          movies={movies.nowTopRatedMovies}
        />
        <MovieList title={"Popular Movies"} movies={movies.nowPopularMovies} />
        <MovieList
          title={"Upcoming Movies"}
          movies={movies.upcomingMovies}
        />

      </div>
    </div>
  );
};

export default SecondaryContainer;

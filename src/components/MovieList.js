import { useState } from "react";
import MovieCard from "./MovieCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const MovieList = ({ title, movies }) => {
  const [show, setshow] = useState(false);

  if (!movies) return;

  const SlideLeft = () => {
    var slider = document.getElementById(title);
    slider.scrollLeft = slider.scrollLeft - 500;
    if (slider.scrollLeft === 500) {
      setshow(false);
    }
  };

  const SlideRight = () => {
    var slider = document.getElementById(title);
    slider.scrollLeft = slider.scrollLeft + 500;
    setshow(true);
  };

  return (
    <div className="mb-10 ml-3">
      <h1 className="text-white m-1 text-2xl">{title}</h1>
      <div className="relative flex items-center   ">
        {/* { slider.scrollLeft == 500 ? <MdChevronLeft onClick={SlideLeft} color="white" size={40} /> : null} */}

        {show && (
          <MdChevronLeft
            className="opacity-50 cursor-pointer hover:opacity-100"
            onClick={SlideLeft}
            color="white"
            size={40}
          />
        )}

        <div
          id={title}
          className=" w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} poster_path={movie.poster_path} />
          ))}
        </div>
        <MdChevronRight
          className="opacity-50 cursor-pointer scroll-smooth hover:opacity-100"
          onClick={SlideRight}
          color="white"
          size={40}
        />
      </div>
    </div>
  );
};

export default MovieList;

import React, { useRef } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies, searchMovie = false }) => {
  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="px-8 relative">
      <h1
        className={`${searchMovie ? "text-black" : "text-white"} text-3xl py-3`}
      >
        {searchMovie ? "Search Results" : title}
      </h1>

      {/* Left Scroll Button */}
      <button
        onClick={scrollLeft}
        className="absolute top-1/2 left-0 z-10 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r-md hover:bg-opacity-80"
      >
        &#8592;
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-hidden hide-scrollbar scrollbar-hide"
      >
        <div className="flex w-max space-x-4">
          {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              movieId={movie.id}
              posterPath={movie.poster_path}
            />
          ))}
        </div>
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={scrollRight}
        className="absolute top-1/2 right-0 z-10 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l-md hover:bg-opacity-80"
      >
        &#8594;
      </button>
    </div>
  );
};

export default MovieList;

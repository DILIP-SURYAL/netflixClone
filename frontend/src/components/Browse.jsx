import React from "react";
import Header from "./Header";
import MainContainer from "./MainContainer";
import MovieContainer from "./MovieContainer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopulerMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import { useEffect } from "react";
import SearchMovie from "./SearchMovie";
const Browse = () => {
  const user = useSelector((store) => store.app.user);
  const toggle = useSelector((store) => store.movie.toggle);
  const navigate = useNavigate();

  // my custom hooks
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Header />
      {toggle ? (
        <SearchMovie />
      ) : (
        <>
          <MainContainer />
          <MovieContainer />
        </>
      )}
    </div>
  );
};

export default Browse;

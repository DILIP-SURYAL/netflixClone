import { useEffect } from "react";
import axios from "axios";
import { options } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getTrailerMovie } from "../redux/movieSlice";

const useMovieById = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getMovieById = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          options
        );

        const trailer = res?.data?.results?.filter(
          (item) => item.type === "Trailer"
        );

        dispatch(
          getTrailerMovie(trailer.length > 0 ? trailer[0] : res.data.results[0])
        );
      } catch (error) {
        console.error("Error fetching movie by ID:", error);
      }
    };

    if (movieId) {
      getMovieById();
    }
  }, [movieId, dispatch]);
};

export default useMovieById;

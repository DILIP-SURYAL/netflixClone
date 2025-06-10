import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    movieName: null,
    searchedMovie: null,
  },
  reducers: {
    setSearchMovieDetails: (state, action) => {
      const { movieName, searchedMovie } = action.payload;
      state.movieName = movieName;
      state.searchedMovie = searchedMovie;
    },
  },
});

export const { setSearchMovieDetails } = searchSlice.actions;

export default searchSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY, API_URL } from "../data/config";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (page, thunkAPI) => {
    const state = thunkAPI.getState();
    const currentPage = state.movies.currentPage;
    const response = await fetch(
      `${API_URL}/movie/popular?api_key=${API_KEY}&page=${currentPage}&language=en-US`
    );
    const data = await response.json();
    return data.results; // Assuming movie data is in results
  }
);

// Thunk to fetch single movie details
export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (movieId) => {
    const response = await fetch(
      `${API_URL}/movie/${movieId}?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data; // Movie details are in the response
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    currentPage: 2,
    movies: [],
    movieDetails: null,
    genres: [],
    status: null,
    detailsStatus: null, // Separate status for movie details fetching
    genresStatus: null, // Separate status for genres fetching
  },
  reducers: {
    changeCurrentPage(state, action) {
      const newPage = action.payload;
      if (newPage > 0) {
        state.currentPage = newPage;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch movies
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = "failed";
      })
      // Fetch movie details
      .addCase(fetchMovieDetails.pending, (state) => {
        state.detailsStatus = "loading";
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.movieDetails = action.payload;
        state.detailsStatus = "succeeded";
      })
      .addCase(fetchMovieDetails.rejected, (state) => {
        state.detailsStatus = "failed";
      })
  },
});

export const { changeCurrentPage } = movieSlice.actions;
export default movieSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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

export const fetchTrailerId = createAsyncThunk(
  "movies/fetchTrailerId",
  async (filmId) => {
    try {
      const response = await axios.get(`${API_URL}/movie/${filmId}/videos?api_key=${API_KEY}`);
      // Предполагаем, что ключ трейлера находится в первом результате, если он есть
      if (response.data.results && response.data.results.length > 0) {
        return response.data.results[0].key;
      } else {
        return null;
      }
    } catch (error) {
      throw error; // Ретроспективная обработка ошибок
    }
  }
);

export const fetchTrending = async (timeWindow) => {
  const response = await axios.get(
    `${API_URL}/trending/all/${timeWindow}?api_key=${API_KEY}`
  );

  return response.data;
}

export const fetchTotalMoviePages = async () => {
  const response = await axios.get(
    `${API_URL}/movie/popular?api_key=${API_KEY}`
  );
  return response.data.total_pages;
}

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    currentPage: 1,
    totalPages: 0,
    timeWindow: 'day',
    movies: [],
    trendingMovies: [],
    movieDetails: null,
    genres: [],
    status: null,
    detailsStatus: null,
    genresStatus: null,
    trailerId: null,
  },
  reducers: {
    changeCurrentPage(state, action) {
      const newPage = action.payload;
      if (newPage > 0) {
        state.currentPage = newPage;
      }
    },
    setTrendingMovies(state, action) {
      state.trendingMovies = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setTimeWindow(state, action) {
      state.timeWindow = action.payload;
    },
    setTrailerId(state, action) {
      state.trailerId = action.payload;
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

      // Fetch trailer ID
      .addCase(fetchTrailerId.fulfilled, (state, action) => {
        state.trailerId = action.payload;
      });
  },
});

export const {
  changeCurrentPage,
  setTrendingMovies,
  setTotalPages,
  setTimeWindow,
  setTrailerId,
} = movieSlice.actions;

export default movieSlice.reducer;

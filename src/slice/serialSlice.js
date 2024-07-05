import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, API_URL } from "../data/config";

export const fetchSerials = createAsyncThunk(
  "serials/fetchSerials",
  async (page) => {
    const response = await axios.get(`${API_URL}/tv/popular?api_key=${API_KEY}&page=${page}`);
    return response.data.results; // Assuming serial data is in results
  }
);

export const fetchTvDetails = createAsyncThunk(
  "serials/fetchTvDetails",
  async (serialId) => {
    const response = await axios.get(`${API_URL}/tv/${serialId}?api_key=${API_KEY}`);
    return response.data; // Serial details are in the response
  }
);

export const fetchTotalTVPages = createAsyncThunk(
  "serials/fetchTotalTVPages",
  async () => {
    const response = await axios.get(`${API_URL}/tv/popular?api_key=${API_KEY}`);
    return response.data.total_pages;
  }
);

export const fetchTvTrailerId = createAsyncThunk(
    "movies/fetchTrailerId",
    async (filmId) => {
      try {
        const response = await axios.get(`${API_URL}/tv/${filmId}/videos?api_key=${API_KEY}`);
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

const serialsSlice = createSlice({
  name: "serials",
  initialState: {
    currentPage: 1,
    totalPages: 0,
    serials: [],
    serialDetails: null,
    status: null,
    detailsStatus: null,
  },
  reducers: {
    changeCurrentPage(state, action) {
      const newPage = action.payload;
      if (newPage > 0) {
        state.currentPage = newPage;
      }
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch serials
      .addCase(fetchSerials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSerials.fulfilled, (state, action) => {
        state.serials = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchSerials.rejected, (state) => {
        state.status = "failed";
      })

      // Fetch TV details
      .addCase(fetchTvDetails.pending, (state) => {
        state.detailsStatus = "loading";
      })
      .addCase(fetchTvDetails.fulfilled, (state, action) => {
        state.serialDetails = action.payload;
        state.detailsStatus = "succeeded";
      })
      .addCase(fetchTvDetails.rejected, (state) => {
        state.detailsStatus = "failed";
      })

      // Fetch total TV pages
      .addCase(fetchTotalTVPages.fulfilled, (state, action) => {
        state.totalPages = action.payload;
      })

      .addCase(fetchTvTrailerId.fulfilled, (state, action) => {
        state.trailerId = action.payload;
      });
  },
});

export const { changeCurrentPage, setTotalPages } = serialsSlice.actions;

export default serialsSlice.reducer;

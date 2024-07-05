import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "../slice/moviesSlice";
import serialSlice from "../slice/serialSlice";

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    serials: serialSlice,
  },
});

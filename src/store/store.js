import { configureStore } from '@reduxjs/toolkit';
import movieSlice from '../slice/moviesSlice';

export const store = configureStore({
    reducer: {
        movies: movieSlice,
    },
});

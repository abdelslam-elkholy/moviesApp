import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "./slices/favourite";
import moviesReducer from "./slices/movies";

const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    movies: moviesReducer,
  },
});

export default store;

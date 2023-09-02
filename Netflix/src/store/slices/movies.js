import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosConfig/instance";

export const fetchMovies = createAsyncThunk("movies/fetchAll", async (page) => {
  const response = await axiosInstance.get("/movie/popular", {
    params: { page },
  });
  return response.data;
});

const movieSlice = createSlice({
  name: "movies",
  initialState: { movies: [], page: 1, count: 0 },

  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload.results;
      state.count = action.payload.total_pages;
    });
  },
});

export const { setPage } = movieSlice.actions;

export const getMovies = (state) => state.movies.movies;
export const getPage = (state) => state.movies.page;
export const getCount = (state) => state.movies.count;

export default movieSlice.reducer;

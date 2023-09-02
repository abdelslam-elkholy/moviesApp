import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
  name: "favourites",
  initialState: { favourites: [] },
  reducers: {
    toggleFavorite: function (state, action) {
      const existingIndex = state.favourites.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex !== -1) {
        state.favourites.splice(existingIndex, 1);
      } else {
        state.favourites.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favouriteSlice.actions;

export default favouriteSlice.reducer;

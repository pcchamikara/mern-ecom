import { createSlice } from '@reduxjs/toolkit';
const loaclFaverites = JSON.parse(localStorage.getItem('favorites'));
const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    favorites: loaclFaverites ? loaclFaverites : [],
  },
  reducers: {
    favoriteHandler(state, action) {
      const favoritesArray = state.favorites;
      const id = action.payload;

      let newFavorites;
      if (
        favoritesArray.length &&
        favoritesArray.find((item) => item._id === id._id)
      ) {
        newFavorites = favoritesArray.filter((item) => item._id !== id._id);
      } else {
        newFavorites = [...favoritesArray, id];
      }
      state.favorites = newFavorites;

      // Store the updated favorites in localStorage
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    },
  },
});

export const favoriteActions = favoriteSlice.actions;
export default favoriteSlice.reducer;

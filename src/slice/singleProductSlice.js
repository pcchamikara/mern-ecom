import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PRODUCT_URL } from '../constants';
const initialState = { product: [], status: ' ', error: null };

export const fetchSingleProduct = createAsyncThunk(
  'product/fetchSingleProduct',
  async (id) => {
    try {
      const response = await axios.get(`${PRODUCT_URL}${id}`);
      return response.data;
    } catch (err) {
      return err.response && err.response.message
        ? err.response.message
        : err.message;
    }
  }
);

const singleProductSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: {
    [fetchSingleProduct.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchSingleProduct.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.status = 'scceeded';
    },
    [fetchSingleProduct.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = 'faild';
    },
  },
});

export default singleProductSlice.reducer;

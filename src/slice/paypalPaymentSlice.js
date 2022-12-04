import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  updatedOrder: {},
  paymentStatus: '',
  paymentError: null,
};
export const makePaypalPayment = createAsyncThunk(
  'paypalPayment/makePaypalPayment',
  async (paymentData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${paymentData.token}`,
        },
      };
      const data = paymentData.details;
      const responce = await axios.put(
        `http://localhost:4000/api/orders/${paymentData.orderID}/pay`,
        data,
        config
      );

      return responce.data;
    } catch (err) {
      return err.response && err.response.message
        ? err.response.message
        : err.message;
    }
  }
);
const paypalPaymentSlice = createSlice({
  name: 'paypalPayment',
  initialState: {},
  extraReducers: {
    [makePaypalPayment.pending]: (state) => {
      state.error = null;
      state.status = 'loading';
    },
    [makePaypalPayment.fulfilled]: (state, action) => {
      if (action.payload.message) {
        state.error = action.payload.message;
      } else {
        state.updatedOrder = action.payload.updatedOrder;
      }

      state.status = 'scceeded';
    },
    [makePaypalPayment.rejected]: (state, action) => {},
  },
});

export default paypalPaymentSlice.reducer;

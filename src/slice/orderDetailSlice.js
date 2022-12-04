import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  orderDetails: {},
  updatedOrder: {},
  status: 'loading',
  error: null,
};

export const getOrderDetails = createAsyncThunk(
  'orderDetails/getOrderDetails',
  async (orderData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${orderData.token}`,
        },
      };
      const responce = await axios.get(
        `http://localhost:4000/api/orders/${orderData.id}`,
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
      console.log('init res', responce.data);
      return responce.data;
    } catch (err) {
      return err.response && err.response.message
        ? err.response.message
        : err.message;
    }
  }
);

const orderDetailSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {},
  extraReducers: {
    /* Get order */
    [getOrderDetails.pending]: (state) => {
      state.error = null;
    },
    [getOrderDetails.fulfilled]: (state, action) => {
      if (action.payload.message) {
        state.error = action.payload.message;
      } else {
        state.orderDetails = action.payload.order;
      }

      state.status = 'scceeded';
    },
    [getOrderDetails.rejected]: (state, action) => {},
    /* Update payment  */

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
    [makePaypalPayment.rejected]: (state, action) => {
      console.log('hit reject');
    },
  },
});

export default orderDetailSlice.reducer;

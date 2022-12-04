import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_BASE } from '../constants/backendConstants';

const initialState = { order: [], status: '', error: null, myOrders: {} };
const requestHeader = (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};

export const creteOreder = createAsyncThunk(
  'orders/createOrder',
  async (orderData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${orderData.token}`,
        },
      };
      const data = orderData.orderItem;
      const responce = await axios.post(
        'http://localhost:4000/api/orders',
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

export const getMyOrders = createAsyncThunk(
  'orders/getMyOreders',
  async (token) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${BACKEND_BASE}/orders/myorders`,
        config
      );
      return response.data;
    } catch (err) {
      return err.response && err.response.message
        ? err.response.message
        : err.message;
    }
  }
);

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BACKEND_BASE}/orders`,
        requestHeader(token)
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: {
    [creteOreder.pending]: (state) => {
      state.error = null;
      state.status = 'loading';
    },
    [creteOreder.fulfilled]: (state, action) => {
      state.order = action.payload.order;
      state.status = 'scceeded';
    },
    [creteOreder.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = 'faild';
    },
    /* get my orders */
    [getMyOrders.pending]: (state) => {
      state.error = null;

      state.status = 'loading';
    },
    [getMyOrders.fulfilled]: (state, action) => {
      state.myOrders = action.payload;
      state.status = 'scceeded';
    },
    [getMyOrders.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = 'faild';
    },
    /* get orders */
    [getOrders.pending]: (state) => {
      state.error = null;

      state.status = 'loading';
    },
    [getOrders.fulfilled]: (state, action) => {
      state.orders = action.payload;
      state.status = 'scceeded';
    },
    [getOrders.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = 'faild';
    },
  },
});

export default orderSlice.reducer;

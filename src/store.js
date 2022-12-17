import { configureStore } from '@reduxjs/toolkit';
import procuctReducer from './slice/productSlice';
import cartReducer from './slice/cartSlice';
import userReducer from './slice/userSlice';
import orderReducer from './slice/orderSlice';
import orderDetailsReducer from './slice/orderDetailSlice';
import favoriteReducer from './slice/favorite.slice';
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: procuctReducer,
    user: userReducer,
    order: orderReducer,
    orderDetails: orderDetailsReducer,
    favorite: favoriteReducer,
  },
  devTools: true,
});

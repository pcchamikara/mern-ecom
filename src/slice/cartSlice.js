import { createSlice } from '@reduxjs/toolkit';
function updateCart(state) {
  if (state.itemList.length) {
    const total = state.itemList.reduce(
      (total, item) => total + item.itemTotleprice,
      0
    );
    state.totalPrice = total;
  }
  localStorage.setItem('cart', JSON.stringify(state));
}

const localStorageItems = JSON.parse(localStorage.getItem('cart'));
const shippingAddress = JSON.parse(localStorage.getItem('shipping-address'));

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    itemList: localStorageItems ? localStorageItems.itemList : [],
    totalQuntity: localStorageItems ? localStorageItems : 0,
    totalPrice: localStorageItems ? localStorageItems.totalPrice : 0,
    totalCount: localStorageItems ? localStorageItems.totalCount : 0,
    shippingAddress: shippingAddress ? shippingAddress : {},
    paymentMethod: '',
  },

  reducers: {
    addToCart(state, action) {
      const newItem = action.payload.product;
      const qty = action.payload.qty;
      const itemTotleprice = newItem.price * qty;
      state.itemList.push({
        ...newItem,
        quntity: qty,
        itemTotleprice,
      });

      state.totalCount++;
      updateCart(state);
    },
    updateQty(state, action) {
      const updatedItem = action.payload;
      const existingPrduct = state.itemList.find(
        (itm) => itm._id === updatedItem.id
      );

      if (existingPrduct) {
        existingPrduct.quntity = updatedItem.qty;
        existingPrduct.itemTotleprice = existingPrduct.price * updatedItem.qty;
        updateCart(state);
      }
    },
    removeFromCart(state, action) {
      const removeItem = action.payload;

      state.itemList = state.itemList.filter(
        (item) => item._id !== removeItem.id
      );
      state.totalCount--;
      updateCart(state);
    },
    /* ================= */
    saveShippingAddress(state, action) {
      localStorage.setItem('shipping-address', JSON.stringify(action.payload));
    },
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload.paymentMethod;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

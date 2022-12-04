import React from 'react';
import { useSelector } from 'react-redux';

export default function CartIcon() {
  const cartCount = useSelector((state) => state.cart.totalCount);
  return (
    <div>
      <i className="fa-sharp fa-solid fa-cart-shopping"></i>
      {cartCount}
    </div>
  );
}

import React from 'react';
import { useSelector } from 'react-redux';

export default function CartIcon() {
  const cartCount = useSelector((state) => state.cart.totalCount);
  return (
    <div>
      {cartCount > 0 ? (
        <div className="cart-wraper">
          <i className="fa-sharp fa-solid fa-cart-shopping  text-warning"></i>
          <span className="count">{cartCount}</span>
        </div>
      ) : (
        <i className="fa-sharp fa-solid fa-cart-shopping "></i>
      )}
    </div>
  );
}

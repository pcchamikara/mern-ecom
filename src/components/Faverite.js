import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { favoriteActions } from '../slice/favorite.slice';

export default function Faverite({ product }) {
  const dispatch = useDispatch();
  let favorites = useSelector((state) => state.favorite.favorites);
  favorites = Object.values(favorites);
  const isCheckd = favorites.find((item) => item._id === product._id);

  const setFaverite = () => {
    const fav = dispatch(favoriteActions.favoriteHandler({ product, toast }));
    console.log(fav);
    /* toast.success(`${product.name} added to your favries`); */
  };

  return (
    <div
      onClick={() => {
        setFaverite();
      }}
    >
      {isCheckd ? (
        <i className="fa-solid fa-heart"></i>
      ) : (
        <i className="fa-sharp fa-regular fa-heart"></i>
      )}
    </div>
  );
}

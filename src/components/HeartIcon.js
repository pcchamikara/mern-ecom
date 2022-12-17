import React from 'react';
import { useSelector } from 'react-redux';

export default function HeartIcon() {
  const favorites = useSelector((state) => state.favorite.favorites);
  return (
    <div>
      {favorites.length > 0 ? (
        <i className="fa-sharp fa-solid fa-heart text-warning"></i>
      ) : (
        <i className="fa-sharp fa-regular fa-heart"></i>
      )}
    </div>
  );
}

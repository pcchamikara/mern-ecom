import React, { useState } from 'react';

export default function RatingSelect({ value, customRatingHandler }) {
  const [rating, setRating] = useState(value);
  const [initval, setInitVal] = useState(value);
  const heghlightRating = (value) => {
    setRating(value);
  };

  return (
    <span>
      {new Array(5).fill().map((e, index) => (
        <i
          onMouseOver={() => heghlightRating(index)}
          onMouseLeave={() => setRating(initval)}
          key={index}
          onClick={() => {
            setInitVal(index);
            customRatingHandler(index + 1);
          }}
          className={
            rating >= index
              ? 'fas fa-star'
              : /* : value >= index - 0.5
              ? 'fas fa-star-half-alt' */
                'far fa-star'
          }
        ></i>
      ))}
    </span>
  );
}

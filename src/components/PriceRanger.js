import React, { useState } from 'react';
import FormRange from 'react-bootstrap/esm/FormRange';

export default function PriceRanger({ maxPrice, setproductPrice }) {
  const [price, setPrice] = useState(maxPrice);
  const setMaxPriceHander = (val) => {
    setPrice(val);
    setproductPrice(val);
  };
  return (
    <>
      <FormRange
        max={maxPrice}
        value={price}
        onChange={(e) => setMaxPriceHander(e.target.value)}
      />
    </>
  );
}

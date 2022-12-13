import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import MainSlider from '../components/MainSlider/MainSlider.js';
import Meta from '../components/Meta.js';

import Products from '../components/Products.js';

export default function HomeScreen() {
  return (
    <div>
      <Meta />
      <div>
        <MainSlider
          titel="Mern shop | Spend less, Smile more "
          dis=" Free shipping on millions of items. Get the best of Shopping and Entertainment with Prime"
        />
      </div>

      <Container>
        <div className="mt-5">
          <h2>Latest Products </h2>
          <Products perPage={4} />
        </div>
      </Container>
    </div>
  );
}

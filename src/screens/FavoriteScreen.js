import React from 'react';
import { Container } from 'react-bootstrap';
import Products from '../components/Products';
import ScreenWrapper from '../components/ScreenWrapper';

export default function FavoriteScreen() {
  return (
    <ScreenWrapper>
      <h1>Favorites</h1>
      <Products />
    </ScreenWrapper>
  );
}

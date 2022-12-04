import React from 'react';
import { CardImg } from 'react-bootstrap';
import { imageUrl } from '../helpers/imageHelper';

export default function ProductImage({ url, variant }) {
  return <CardImg src={imageUrl(url)} variant={variant} />;
}

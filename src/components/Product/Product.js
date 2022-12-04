import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ProductImage from '../ProductImage';
import Rating from '../Rating';
import './Product.scss';

export default function Product({ product }) {
  return (
    <Card>
      <Link to={`/product/${product._id}`}>
        <ProductImage url={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Card.Title>
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </Card.Title>

        <span className="my-3">
          <Rating
            value={product.totalRating}
            text={`from ${product.numOfReviews} ${
              product.numOfReviews > 1 ? 'reviews' : 'review'
            }`}
          />
        </span>
      </Card.Body>
    </Card>
  );
}

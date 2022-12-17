import React from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Faverite from '../Faverite';

import ProductImage from '../ProductImage';
import Rating from '../Rating';
import './Product.scss';

export default function Product({ product }) {
  return (
    <Card>
      <span className="faverite">
        <Faverite product={product} />
      </span>
      <Link to={`/product/${product._id}`}>
        <ProductImage
          url={product.image}
          variant="top"
          style={{ aspectRatio: '1/1', objectFit: 'contain' }}
        />
      </Link>
      <Card.Body>
        <Card.Title>
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </Card.Title>
        <Col>
          <strong>${product.price} </strong>
        </Col>
        <span className="rating">
          <Rating
            value={product.totalRating}
            text={`from ${product.numOfReviews} ${
              product.numOfReviews > 1 ? 'reviews' : 'review'
            }`}
          />
        </span>
      </Card.Body>

      <Col>
        <Link to={`/product/${product._id}`}>
          <Button style={{ width: '100%' }}> More Details</Button>
        </Link>
      </Col>
    </Card>
  );
}

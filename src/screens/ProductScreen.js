import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../slice/productSlice';
import { cartActions } from '../slice/cartSlice';
import Loader from '../components/Loader';
import ProductImage from '../components/ProductImage';
import AddReviewSection from '../components/AddReviewSection';
import Rating from '../components/Rating';
import {
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
  Card,
  Button,
  FormControl,
  Alert,
  Container,
} from 'react-bootstrap';

export default function ProductScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, status, error } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.user);

  const [qty, setQty] = useState(1);

  const addToCartHandle = () => {
    dispatch(cartActions.addToCart({ product, qty }));
  };
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [id, dispatch]);

  return (
    <Container>
      {status === 'loading' ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <div>
          <Row className="d-flex align-items-center">
            <Col>
              <Link to="/" className="btn btn-light my-3">
                Go back
              </Link>
            </Col>
            {userInfo.isAdmin && (
              <Link to={`/admin/product-edit/${product._id}`}>
                <Col style={{ textAlign: 'right' }}>
                  <i className="fa-solid fa-gear"></i> Edit
                </Col>
              </Link>
            )}
          </Row>

          <Row>
            <Col md={12} lg={6}>
              <ProductImage url={product.image} fluid />
              <AddReviewSection
                reviews={product.reviews}
                productId={product._id}
              />
            </Col>
            <Col lg={3} md={12}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.totalRating}
                    text={`from ${product.numOfReviews} reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>{product.description}</ListGroupItem>
                <ListGroupItem>Price: $ {product.price}</ListGroupItem>
              </ListGroup>
            </Col>
            <Col lg={3} md={12}>
              <Card>
                <ListGroup>
                  <ListGroupItem>Price: $ {product.price}</ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col> status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col> Qty:</Col>
                        <Col>
                          <FormControl
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}

                  <ListGroupItem>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock < 1}
                      variant="primary"
                      onClick={addToCartHandle}
                    >
                      Add to cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
}

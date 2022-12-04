import React, { useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Row,
  Stack,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { productReview } from '../slice/productSlice';
import Rating from './Rating';
import RatingSelect from './RatingSelect';
import { toast } from 'react-toastify';
import Loader from './Loader';

export default function AddReviewSection({ reviews, productId }) {
  const { userInfo } = useSelector((state) => state.user);
  const { status, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [comment, setComment] = useState('');
  const [customRating, setCustomRating] = useState(5);
  const customRatingHandler = (value) => {
    setCustomRating(value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const ratingData = { rating: customRating, comment };
    dispatch(
      productReview({ id: productId, token: userInfo.token, toast, ratingData })
    );
  };
  return (
    <Row className="mt-4">
      <Col md={12}>
        <h2>Reviews</h2>
        <ListGroup variant="flush">
          {Array.isArray(reviews) && reviews.length < 1 ? (
            <ListGroupItem>
              <Alert variant="info">No reviews added yet</Alert>
            </ListGroupItem>
          ) : (
            Array.isArray(reviews) &&
            [...reviews].reverse().map((review) => (
              <ListGroupItem key={review._id}>
                <Row>
                  <Stack gap={3} direction="horizontal">
                    <strong className="mr-3">{review.name}</strong>
                    <Rating value={review.rating} />
                  </Stack>
                </Row>
                <Row>
                  <Col>{review.comment}</Col>
                </Row>
              </ListGroupItem>
            ))
          )}
          <ListGroupItem>
            {userInfo.name ? (
              <>
                <h4 className="my-3">Write a Customer review</h4>
                <Row>
                  <Col>
                    Your rating{' '}
                    <RatingSelect
                      value={customRating}
                      customRatingHandler={customRatingHandler}
                    />
                  </Col>
                </Row>
                {status === 'loading' ? (
                  <Loader />
                ) : error ? (
                  <Alert>{error}</Alert>
                ) : (
                  <></>
                )}
                <Form onSubmit={submitHandler}>
                  <FormGroup className="mt-3">
                    <FormControl
                      as="textarea"
                      placeholder="Comment"
                      value={comment}
                      rows={5}
                      onChange={(e) => setComment(e.target.value)}
                    ></FormControl>
                  </FormGroup>{' '}
                  <Button type="submit" variant="primary" className="mt-3">
                    Submit
                  </Button>
                </Form>
              </>
            ) : (
              <span>
                Please{' '}
                <Link to={`/login?redirect=product/${productId}`}>Log in</Link>{' '}
                to add the comment
              </span>
            )}
          </ListGroupItem>
        </ListGroup>
      </Col>
    </Row>
  );
}

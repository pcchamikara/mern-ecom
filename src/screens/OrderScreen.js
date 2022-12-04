import React, { useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import ProductImage from '../components/ProductImage';
import { creteOreder } from '../slice/orderSlice';

export default function OrderScreen() {
  const cart = useSelector((state) => state.cart);
  const shipping = cart.shippingAddress;
  const { userInfo } = useSelector((state) => state.user);
  const token = userInfo.token;
  const { order, status, error } = useSelector((state) => state.order);
  const taxPrice = 0;
  const shippingPrice = 0;
  let navigate = useNavigate();
  const dispatch = useDispatch();
  /* calculate */
  const itemsPrice = cart.itemList.reduce(
    (acc, item) => (acc += item.price * item.quntity),
    0
  );
  const totlPrice = itemsPrice - taxPrice - shippingPrice;

  const totalItems = cart.itemList.reduce(
    (acc, item) => (acc += Number(item.quntity)),
    0
  );

  useEffect(() => {
    if (status === 'scceeded') {
      navigate(`/order/${order._id}`);
    }
  }, [status, order, navigate]);
  const placeOrderHandler = () => {
    dispatch(
      creteOreder({
        orderItem: {
          orderItems: cart.itemList,
          shippingAddress: {
            address: shipping.address,
            city: shipping.city,
            zipCode: shipping.zipCode,
            country: shipping.country,
          },
          paymentMethod: cart.paymentMethod,
          itemPrice: itemsPrice,
          taxPrice: taxPrice,
          shippingPrice: shippingPrice,
          totalPrice: totlPrice,
        },
        token: token,
      })
    );
  };

  return (
    <>
      {status === 'loading' && <Loader />}
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>shipping</h2>
              <p>
                {shipping.address}, {shipping.city}, {shipping.country},{' '}
                {shipping.zipCode}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment</h2>
              <p>Method: {cart.paymentMethod}</p>
            </ListGroupItem>
            <ListGroupItem className="p-0">
              {cart.itemList.length === 0 ? (
                <h2>Your cart is empty</h2>
              ) : (
                <ListGroup variant="flush p-0">
                  {cart.itemList.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}>
                          <ProductImage url={item.image} />
                        </Col>
                        <Col>{item.name}</Col>
                        <Col className="d-flex">
                          {item.quntity} X ${item.price} =
                          <b> ${item.quntity * item.price}</b>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
              <ListGroup></ListGroup>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup varient="flush">
              <ListGroupItem>
                <h2>Order Summery</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items:</Col>
                  <Col>{totalItems}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total Price:{}</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem className="d-grid">
                <Button
                  type="button"
                  className="btn-block"
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

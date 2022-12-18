import React from 'react';
import {
  Col,
  ListGroup,
  Row,
  Alert,
  ListGroupItem,
  Image,
  FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import ScreenWrapper from '../components/ScreenWrapper';
import { cartActions } from '../slice/cartSlice';
import { toast } from 'react-toastify';
export default function Cart() {
  const cartItems = useSelector((state) => state.cart.itemList);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const dispatch = useDispatch();
  const updateQtyHandler = (id, qty) => {
    dispatch(cartActions.updateQty({ id, qty }));
  };
  const deleteHandler = (id, name) => {
    dispatch(cartActions.removeFromCart({ id, name, toast }));
  };
  const userInfo = useSelector((state) => state.user.userInfo);
  const total =
    cartItems.length > 0 && cartItems.reduce((acc, item) => acc + Number(8));

  return (
    <ScreenWrapper>
      <h1>Shopping cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Alert variant="info">Your cart is empty</Alert>
          ) : (
            <ListGroup>
              {cartItems.map((itm, key) => (
                <ListGroupItem key={key}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <ProductImage url={itm.image} />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${itm._id}`}>{itm.name}</Link>
                    </Col>
                    <Col md={2}>
                      <FormControl
                        as="select"
                        defaultValue={itm.quntity}
                        onChange={(e) =>
                          updateQtyHandler(itm._id, Number(e.target.value))
                        }
                      >
                        {[...Array(itm.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </FormControl>
                    </Col>

                    <Col md={2}>{itm.price}</Col>
                    <Col md={2}>{itm.itemTotleprice}</Col>
                    <Col md={1}>
                      <i
                        className="fa-sharp fa-solid fa-trash cursor-pointer"
                        onClick={() => deleteHandler(itm._id, itm.name)}
                      ></i>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        {cartItems.length > 0 && (
          <Col md={4}>
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col>
                    <h4>Sub total</h4>
                  </Col>
                  <Col>
                    <h4>{totalPrice} $</h4>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Link
                  to={userInfo._id ? '/shipping' : '/login?redirect=shipping'}
                  className="btn btn-primary"
                >
                  Checkout
                </Link>
              </ListGroupItem>
            </ListGroup>
          </Col>
        )}
      </Row>
    </ScreenWrapper>
  );
}

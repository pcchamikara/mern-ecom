import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { getOrderDetails } from '../slice/orderDetailSlice';
import { BACKEND_BASE } from '../constants/backendConstants';
import { PayPalButton } from 'react-paypal-button-v2';
import {
  Alert,
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import axios from 'axios';
import { makePaypalPayment } from '../slice/orderDetailSlice';
import { imageUrl } from '../helpers/imageHelper';

/* const testDetails = {
  id: '1M2089627N101701V',
  intent: 'CAPTURE',
  status: 'COMPLETED',
  purchase_units: [
    {
      reference_id: 'default',
      amount: {
        currency_code: 'USD',
        value: '1919.91',
      },
      payee: {
        email_address: 'sb-m2kgh22167219@business.example.com',
        merchant_id: 'BDRQVJUCJCH9N',
      },
      shipping: {
        name: {
          full_name: 'John Doe',
        },
        address: {
          address_line_1: '1 Main St',
          admin_area_2: 'San Jose',
          admin_area_1: 'CA',
          postal_code: '95131',
          country_code: 'US',
        },
      },
      payments: {
        captures: [
          {
            id: '2SY68479U2447401W',
            status: 'COMPLETED',
            amount: {
              currency_code: 'USD',
              value: '1919.91',
            },
            final_capture: true,
            seller_protection: {
              status: 'ELIGIBLE',
              dispute_categories: [
                'ITEM_NOT_RECEIVED',
                'UNAUTHORIZED_TRANSACTION',
              ],
            },
            create_time: '2022-11-12T14:20:31Z',
            update_time: '2022-11-12T14:20:31Z',
          },
        ],
      },
    },
  ],
  payer: {
    name: {
      given_name: 'John',
      surname: 'Doe',
    },
    email_address: 'sb-zmz4p22167218@personal.example.com',
    payer_id: 'D7GGXDTP78PL4',
    address: {
      country_code: 'US',
    },
  },
  create_time: '2022-11-12T14:20:13Z',
  update_time: '2022-11-12T14:20:31Z',
  links: [
    {
      href: 'https://api.sandbox.paypal.com/v2/checkout/orders/1M2089627N101701V',
      rel: 'self',
      method: 'GET',
    },
  ],
}; */

export default function OrderItemScreen() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user.userInfo);
  const { orderDetails, updatedOrder, status, error } = useSelector(
    (state) => state.orderDetails
  );

  const [sdk, setSdk] = useState(false);
  const id = useParams().id;
  useEffect(() => {
    dispatch(getOrderDetails({ id, token }));
  }, [updatedOrder]);

  useEffect(() => {
    getPayPalData();
  }, []);

  const getPayPalData = async () => {
    const { data: clientId } = await axios.get(`${BACKEND_BASE}/config/paypal`);
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.async = true;
    script.onload = () => {
      setSdk(true);
    };
    document.body.appendChild(script);
  };

  const paypalRespose = (details, data) => {
    dispatch(
      makePaypalPayment({
        token: token,
        orderID: orderDetails._id,
        details: details,
      })
    );
  };

  return (
    <div>
      {status === 'loading' ? (
        <Loader />
      ) : error ? (
        <Alert variant={'danger'}>{error}</Alert>
      ) : (
        <>
          <Row>
            <Col md={8}>
              {orderDetails.isPaid ? (
                <Alert>
                  Payment Compleated at {orderDetails.paymentResult.updateTime}
                </Alert>
              ) : (
                <Alert variant={'danger'}>Payment is pending</Alert>
              )}
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h2 className="mb-5">Oreder {orderDetails._id}</h2>
                  <h4>Shipping </h4>
                  <p>
                    <b>Name:</b> {orderDetails.shippingAddress.address},{' '}
                    {orderDetails.shippingAddress.city},{' '}
                    {orderDetails.shippingAddress.country},{' '}
                    {orderDetails.shippingAddress.zipCode}
                  </p>
                  <p>
                    <b>Address:</b> {orderDetails.shippingAddress.address},{' '}
                    {orderDetails.shippingAddress.city},{' '}
                    {orderDetails.shippingAddress.country},{' '}
                    {orderDetails.shippingAddress.zipCode}
                  </p>
                </ListGroupItem>
                <ListGroupItem>
                  <h4>Payment Method</h4>
                  <p> {orderDetails.paymentMethod}</p>
                </ListGroupItem>
                <ListGroupItem className="p-0">
                  {orderDetails.orderItems === 0 ? (
                    <h2>Your cart is empty</h2>
                  ) : (
                    <ListGroup variant="flush p-0">
                      <ListGroupItem variant="flush">
                        <h4>Order Items</h4>
                      </ListGroupItem>
                      {orderDetails.orderItems.map((item, index) => (
                        <ListGroupItem key={index}>
                          <Row>
                            <Col md={1}>
                              <Image src={imageUrl(item.image)} fluid />
                            </Col>
                            <Col>{item.name}</Col>
                            <Col className="d-flex justify-content-end">
                              {item.quntity} X ${item.price} =
                              <b className="mx-1">
                                {' '}
                                ${item.quntity * item.price}
                              </b>
                            </Col>
                          </Row>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  )}
                  <ListGroup></ListGroup>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>
                      <strong>Total price</strong>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <b>
                        <h4>${orderDetails.totalPrice}</h4>
                      </b>
                    </Col>
                  </Row>
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
                      <Col>{}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      {sdk && !orderDetails.isPaid && (
                        <PayPalButton
                          amount={orderDetails.totalPrice}
                          // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                          onSuccess={(details, data) => {
                            paypalRespose(details, data);
                            /*   alert(
                              'Transaction completed by ' +
                                details.payer.name.given_name
                            );

                            // OPTIONAL: Call your server to save the transaction
                            return fetch('/paypal-transaction-complete', {
                              method: 'post',
                              body: JSON.stringify({
                                orderID: data.orderID,
                              }),
                            }); */
                          }}
                        />
                      )}

                      <Col></Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

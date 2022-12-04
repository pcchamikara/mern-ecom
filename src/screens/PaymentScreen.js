import React, { useState } from 'react';
import { cartActions } from '../slice/cartSlice';
import {
  Alert,
  Button,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel';

export default function ShippingScreen() {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(cartActions.savePaymentMethod({ paymentMethod }));
    navigate('/order');
  };
  return (
    <div>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment</h1>

        {/*  {error && <Alert varient="danger">{error} </Alert>} */}
        <Form onSubmit={submitHandler}>
          <h4>Payment Method</h4>
          <FormGroup>
            <FormCheck
              type="radio"
              value="PayPal"
              name="paymentMethod"
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
              id="paypal"
              label="PayPal"
              defaultChecked
            ></FormCheck>
          </FormGroup>
          {/*      <FormGroup>
            <FormCheck
              type="radio"
              value="Stripe"
              name="paymentMethod"
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
              id="Stripe"
              label="Stripe"
            ></FormCheck>
          </FormGroup> */}

          <Button type="submit" variant="primary" className="mt-3">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}

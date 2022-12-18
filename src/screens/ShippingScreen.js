import React, { useState } from 'react';
import { cartActions } from '../slice/cartSlice';
import {
  Alert,
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import ScreenWrapper from '../components/ScreenWrapper';

export default function ShippingScreen() {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [zipCode, setZipCode] = useState(shippingAddress.zipCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      cartActions.saveShippingAddress({ address, city, country, zipCode })
    );
    navigate('/payment');
  };
  return (
    <ScreenWrapper>
      <FormContainer>
        <CheckoutSteps step1 step2 />

        {/*  {error && <Alert varient="danger">{error} </Alert>} */}
        <Form onSubmit={submitHandler}>
          <FormGroup>
            <FormLabel> Address</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel> City</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel> Country</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel> ZipCode</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter ZipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            ></FormControl>
          </FormGroup>

          <Button type="submit" variant="primary" className="mt-3">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </ScreenWrapper>
  );
}

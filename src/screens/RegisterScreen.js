import React, { useEffect, useState } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import ScreenWrapper from '../components/ScreenWrapper';
import { userReister } from '../slice/userSlice';

export default function RegisterScreen({ location }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const userData = { email, password, name };
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(userReister(userData));
  };
  const { userInfo, status, error } = useSelector((state) => state.user);
  const redirect =
    window.location && window.location.search
      ? '/' + window.location.search.split('=')[1]
      : '/';

  let navigate = useNavigate();
  useEffect(() => {
    if (userInfo._id) {
      navigate(redirect);
    }
  }, [userInfo, navigate]);
  return (
    <ScreenWrapper>
      <FormContainer>
        <h1 className="my-3">Sign In</h1>
        {error && <Alert varient="danger">{error} </Alert>}
        <Form onSubmit={submitHandler}>
          <FormGroup>
            <FormLabel> Name</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel> Email Address</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></FormControl>
          </FormGroup>

          <FormGroup>
            <FormLabel> Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></FormControl>
          </FormGroup>
          <Button type="submit" variant="primary" className="mt-3">
            Sign In
          </Button>
          <Row className="py-3">
            <Col>
              Do you have an account ?
              <Link to="/login" className="mx-1">
                login
              </Link>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </ScreenWrapper>
  );
}

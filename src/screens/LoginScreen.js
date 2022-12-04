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
import { userLogin } from '../slice/userSlice';

export default function LoginScreen({ location }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userData = { email, password };
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(userLogin(userData));
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
    <>
      <FormContainer>
        <h1 className="my-3">Sign In</h1>

        {error && <Alert varient="danger">{error} </Alert>}
        <Form onSubmit={submitHandler}>
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
              type="text"
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
              New customer ?
              <Link to={'/register'} className="mx-1">
                Register
              </Link>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  );
}

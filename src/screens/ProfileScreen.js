import React, { useEffect, useState } from 'react';
import {
  FormGroup,
  Form,
  FormLabel,
  FormControl,
  Button,
  Alert,
  Row,
  Col,
  Table,
  LinkContainer,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../slice/userSlice';
import { getMyOrders } from '../slice/orderSlice';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import DashboardWrapper from '../components/DashboardWrapper';
export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { userInfo, status, error } = useSelector((state) => state.user);

  const token = userInfo.token;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const userData = { name, email, password, token };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateUser(userData));
  };

  useEffect(() => {
    dispatch(getMyOrders(token));
  }, []);
  const {
    myOrders,
    status: orderStatus,
    error: orderErrors,
  } = useSelector((state) => state.order);

  return (
    <DashboardWrapper>
      {error && <Alert varient="danger">{error} </Alert>}
      <Row>
        <Col md={4}>
          <h3 className="text-center">My Details</h3>
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
              <FormLabel> New Password</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></FormControl>
            </FormGroup>
            <Button type="submit" variant="primary" className="mt-3">
              Update
            </Button>
          </Form>
        </Col>
        <Col md={8}>
          <h3 className="text-center">My orders</h3>
          {orderStatus === 'loading' ? (
            <Loader />
          ) : (
            <Table striped hover responsive className="table-sm">
              <thead>
                {myOrders && myOrders.length === 0 ? (
                  <Alert>There are no any orders yet</Alert>
                ) : (
                  <>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Paid</th>
                      <th></th>
                    </tr>
                    {myOrders.length > 0 &&
                      myOrders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.createdAt.substring(0, 10)}</td>
                          <td>${order.totalPrice}</td>
                          <td>
                            {order.isPaid ? (
                              order.paidAt.substring(0, 10)
                            ) : (
                              <p style={{ color: 'red' }}>
                                Payment not compleated
                              </p>
                            )}
                          </td>
                          <td>
                            <Link to={`/order/${order._id}`}>
                              <Button>Order</Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </>
                )}
              </thead>
            </Table>
          )}
        </Col>
      </Row>
    </DashboardWrapper>
  );
}

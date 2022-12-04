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
  FormCheck,
  Container,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUserById } from '../../slice/userSlice';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import DashboardWrapper from '../../components/DashboardWrapper';

export default function UserEdit() {
  const dispatch = useDispatch();

  const { userInfo, status, error, editUser } = useSelector(
    (state) => state.user
  );
  const token = userInfo.token;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const userData = { name, email, password, isAdmin };
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(getUserById({ id, token }));
      navigate();
      //setName(editUser.name ? editUser.name : '');
    }
  }, [id]);

  useEffect(() => {
    setName(editUser.name ? editUser.name : '');
    setEmail(editUser.email ? editUser.email : '');
    setIsAdmin(editUser.isAdmin ? editUser.isAdmin : false);
  }, [editUser]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateUserById({ userData, token, userId: id, toast, navigate }));
  };

  return (
    <DashboardWrapper>
      <Link to="/admin/user-list" className="btn btn-light my-3">
        Go back
      </Link>

      {status === 'loading' ? (
        <Loader />
      ) : status === 'faild' ? (
        <Alert varient="danger">{error} </Alert>
      ) : (
        <FormContainer>
          <Col>
            <h3 className="text-center">{editUser.name}</h3>
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
              <FormGroup className="d-flex justidy">
                <FormCheck
                  type="checkbox"
                  value={isAdmin}
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  label={'Is Admin'}
                ></FormCheck>
              </FormGroup>
              <Button type="submit" variant="primary" className="mt-3">
                Update
              </Button>
            </Form>
          </Col>
        </FormContainer>
      )}
    </DashboardWrapper>
  );
}

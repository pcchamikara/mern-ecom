import React, { useEffect, useRef } from 'react';
import { Alert, Button, Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';

import { toast } from 'react-toastify';
import { getOrders } from '../../slice/orderSlice';
import DashboardWrapper from '../../components/DashboardWrapper';

export default function OrderList() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { orders, error, status } = useSelector((state) => state.order);
  console.log(error);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.isAdmin) {
      dispatch(getOrders(userInfo.token));
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  /*  const deleteHandler = (userId) => {
    dispatch(deleteUser({ userId, token: userInfo.token, toast }));
  };
 */
  return (
    <DashboardWrapper>
      <h2>Order list</h2>

      {status === 'loading' ? (
        <Loader />
      ) : status === 'faild' ? (
        <Alert varient="danger">{error} </Alert>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <tbody>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th></th>
            </tr>
            {Array.isArray(orders) &&
              orders.length > 0 &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt && order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    <Link to={`/admin/user-edit/${order._id}`}>
                      <Button variant="light">
                        <i className="fa-sharp fa-solid fa-edit"></i>
                      </Button>
                    </Link>

                    <Button
                      variant="danger"
                      onClick={() => {
                        /*  deleteHandler(user._id); */
                      }}
                    >
                      <i className="fa-sharp fa-solid fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </DashboardWrapper>
  );
}

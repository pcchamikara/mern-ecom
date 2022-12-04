import React, { useEffect, useRef } from 'react';
import { Alert, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { deleteUser, getUserList } from '../../slice/userSlice';
import { toast } from 'react-toastify';
import DashboardWrapper from '../../components/DashboardWrapper';

export default function UserList() {
  const dispatch = useDispatch();
  const { userInfo, error, status, userList } = useSelector(
    (state) => state.user
  );
  console.log(error);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.isAdmin) {
      dispatch(getUserList(userInfo.token));
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  const deleteHandler = (userId) => {
    dispatch(deleteUser({ userId, token: userInfo.token, toast }));
  };

  return (
    <DashboardWrapper>
      <h2>User list</h2>

      {status === 'loading' ? (
        <Loader />
      ) : status === 'faild' ? (
        <Alert varient="danger">{error} </Alert>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <tbody>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
            {Array.isArray(userList) &&
              userList.length > 0 &&
              userList.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? <p>Admin</p> : <p>Customer</p>}</td>
                  <td>
                    <Link to={`/admin/user-edit/${user._id}`}>
                      <Button variant="light">
                        <i className="fa-sharp fa-solid fa-edit"></i>
                      </Button>
                    </Link>

                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteHandler(user._id);
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

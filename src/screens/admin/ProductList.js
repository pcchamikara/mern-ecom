import React, { useEffect, useRef } from 'react';
import { Alert, Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { deleteUser, getUserList } from '../../slice/userSlice';
import { toast } from 'react-toastify';
import { deleteProduct, fetchProducts } from '../../slice/productSlice';
import DashboardWrapper from '../../components/DashboardWrapper';

export default function ProductList() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { products, status, error } = useSelector((state) => state.product);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.isAdmin) {
      dispatch(fetchProducts({}));
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const deleteHandler = (productId) => {
    dispatch(deleteProduct({ productId, token: userInfo.token, toast }));
  };

  return (
    <DashboardWrapper>
      <Row className="mb-3">
        <Col>
          <h2>Product list</h2>
        </Col>
        <Col className="text-end">
          <Button as={Link} to="/admin/product-add">
            + Create Product
          </Button>
        </Col>
      </Row>

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
              <th>Price</th>
              <th>category</th>
              <th>Brand</th>
              <th></th>
            </tr>
            {Array.isArray(products) &&
              products.length > 0 &&
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>

                  <td>
                    <Link to={`/admin/product-edit/${product._id}`}>
                      <Button variant="light">
                        <i className="fa-sharp fa-solid fa-edit"></i>
                      </Button>
                    </Link>

                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteHandler(product._id);
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

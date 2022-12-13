import React, { useEffect } from 'react';
import { Alert, Col, Pagination, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSearchParams,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { fetchProducts } from '../slice/productSlice';
import Loader from './Loader';
import Product from './Product/Product';

export default function Products({ perPage = 8 }) {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.product);

  const { keyword } = useParams();
  const { pageNumber } = useParams();

  useEffect(() => {
    /*  if (keyword !== '') {
      dispatch(fetchProducts({ keyword }));
    } */
    dispatch(fetchProducts({ perPage }));
  }, [dispatch, keyword]);

  /* pagination */

  let content;
  if (status === 'loading') {
    content = <Loader />;
  } else if (status === 'faild') {
    content = <p>{error}</p>;
  } else if (status === 'scceeded') {
    content = (
      <Row>
        {products.length > 0 ? (
          <>
            {products.map((prod) => (
              <Col sm={12} md={6} lg={4} xl={3} key={prod._id}>
                <Product product={prod} />
              </Col>
            ))}
            <div></div>
          </>
        ) : (
          <>
            <Alert variant="danger">No Results to show </Alert>
          </>
        )}
      </Row>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '400px' }}>{content}</div>
  );
}

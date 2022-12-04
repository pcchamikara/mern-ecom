import React, { useEffect } from 'react';
import { Alert, Col, Pagination, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchProducts } from '../slice/productSlice';
import Loader from './Loader';
import Product from './Product/Product';

export default function Products() {
  const dispatch = useDispatch();
  const { products, status, error, pages, page } = useSelector(
    (state) => state.product
  );

  const { keyword } = useParams();
  const { pageNumber } = useParams();
  useEffect(() => {
    if (keyword !== '') {
      console.log('keywordkeyword', keyword);
      dispatch(fetchProducts({ keyword, pageNumber }));
    }
  }, [dispatch, keyword, pageNumber]);

  /* pagination */
  let items = []; //keyword ? `/search/${keyword}/page/${page}` :
  for (let number = 1; number <= pages; number++) {
    items.push(
      <li
        className={number === page ? ' page-item active' : 'page-item'}
        key={number}
      >
        <Link
          className="page-link"
          to={keyword ? `/search/${keyword}/page/${number}` : `/page/${number}`}
        >
          {number}
        </Link>
      </li>
    );
  }

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
            <div>
              <Pagination>{items}</Pagination>
            </div>
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

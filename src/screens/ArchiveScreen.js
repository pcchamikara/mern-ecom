import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  FormSelect,
  Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  useNavigate,
  useParams,
  useLocation,
  createSearchParams,
} from 'react-router-dom';
import PaginationLinks from '../components/PaginationLinks';
import PriceRanger from '../components/PriceRanger';
import Products from '../components/Products';
import ScreenWrapper from '../components/ScreenWrapper';
import { fetchProducts } from '../slice/productSlice';

export default function ArchiveScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pages, page, status } = useSelector((state) => state.product);
  const priceMark = 2500;
  const location = useLocation(); // get current page
  const searchParams = new URLSearchParams(location.search); // get query params
  // set query params, if they have
  const [orderBy, setOrederBy] = useState(
    searchParams.get('orderBy') ? searchParams.get('orderBy') : 'createdAt'
  );
  const [maxPrice, setMaxPrice] = useState(priceMark);
  const [productPrice, setProductPrice] = useState(
    searchParams.get('productPrice')
      ? searchParams.get('productPrice')
      : priceMark
  );
  /* pagination */
  const [pageNumber, setPageNumber] = useState(
    searchParams.get('pageNumber') ? searchParams.get('pageNumber') : 1
  );
  const params = { orderBy, productPrice, pageNumber }; // preparing query params to push into route
  const { category } = useParams();
  const filterHander = (e) => {
    e.preventDefault();
    setPageNumber(1);
    navigate({
      pathname: location.pathname,
      search: `?${createSearchParams(params)}`,
    });
  };
  /* pagination trigger */
  useEffect(() => {
    navigate({
      pathname: location.pathname,
      search: `?${createSearchParams(params)}`,
    });
  }, [pageNumber]);

  useEffect(() => {
    dispatch(
      fetchProducts({ max: productPrice, sort: orderBy, category, pageNumber })
    );
  }, [
    category,
    searchParams.get('orderBy'),
    searchParams.get('productPrice'),
    searchParams.get('pageNumber'),
  ]);
  return (
    <ScreenWrapper>
      <h1>{category ? category : 'All products'}</h1>
      <Row>
        <Col sm={3}>
          <ListGroup>
            <form>
              <ListGroupItem>
                <h4>Order By</h4>

                <FormSelect
                  aria-label="Default select example"
                  onChange={(e) => setOrederBy(e.target.value)}
                >
                  <option value="createdAt">Latest</option>
                  <option value="price">Price</option>
                  <option value="totalRating">Reviews</option>
                </FormSelect>
              </ListGroupItem>

              <ListGroupItem>
                <h4>Price</h4>${productPrice}
                <PriceRanger
                  setproductPrice={setProductPrice}
                  maxPrice={maxPrice}
                />
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type="submit"
                  variant="primary"
                  style={{ width: '100%' }}
                  onClick={filterHander}
                >
                  Filter
                </Button>
              </ListGroupItem>
            </form>
          </ListGroup>
        </Col>
        <Col sm={9}>
          <Products />

          {pageNumber < pages && status === 'scceeded' && (
            <PaginationLinks
              page={pageNumber}
              pages={pages}
              setPageNumber={setPageNumber}
            />
          )}
        </Col>
      </Row>
    </ScreenWrapper>
  );
}

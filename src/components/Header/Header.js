import React from 'react';
import { Col, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { category } from '../../constants/productConstants';
import { userActions } from '../../slice/userSlice';
import CartIcon from '../CartIcon';
import SearchBox from '../SearchBox';
import './Header.scss';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const logOutHandler = () => {
    dispatch(userActions.logOut());
    navigate('/');
  };
  return (
    <header>
      <Navbar expand="lg" className="navbar-dark bg-primary">
        <Container className="justify-content-between">
          <Navbar.Brand>
            {' '}
            <Nav.Link as={Link} to="/">
              Mern E-com
            </Nav.Link>
          </Navbar.Brand>
          <Col className="serchbox d-none d-lg-block ">
            <SearchBox />
          </Col>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav>
            <Navbar.Collapse id="basic-navbar-nav me-auto">
              <NavDropdown title="categories">
                {category.map((cat) => (
                  <NavDropdown.Item
                    as={Link}
                    to={`/products/${cat}`}
                    key={cat._id + cat.name}
                  >
                    {cat}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <Nav.Link as={Link} to="/cart">
                <CartIcon />
              </Nav.Link>
              {userInfo && userInfo.name ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logOutHandler}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Sign in
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin">
                  <NavDropdown.Item as={Link} to="/admin/user-list">
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/product-list">
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/order-list">
                    Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

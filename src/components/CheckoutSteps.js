import React from 'react';
import { Nav, NavItem, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <Nav>
      {/*   <NavItem>
        {step1 ? (
          <NavLink>Sign in</NavLink>
        ) : (
          <NavLink disabled>Sign in</NavLink>
        )}
      </NavItem> */}
      <NavItem>
        {step2 ? (
          <NavLink as={Link} to="/shipping">
            Shipping
          </NavLink>
        ) : (
          <NavLink disabled>Shipping</NavLink>
        )}
      </NavItem>
      <NavItem>
        {step3 ? (
          <NavLink as={Link} to="/payment">
            Payment
          </NavLink>
        ) : (
          <NavLink disabled>Payment</NavLink>
        )}
      </NavItem>
      <NavItem>
        {step4 ? (
          <NavLink>Place Order</NavLink>
        ) : (
          <NavLink disabled>Place Order</NavLink>
        )}
      </NavItem>
    </Nav>
  );
}

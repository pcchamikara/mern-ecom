import React from 'react';
import {
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Nav,
  NavLink,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { category } from '../constants/productConstants';

export default function Footer() {
  return (
    <footer className="bg-primary py-5">
      <Container>
        <Row>
          <Col>
            <Nav className="flex-column">
              <h5 className="text-white">Categories</h5>
              {category.map((cat) => (
                <NavLink
                  to={`/products/${cat}`}
                  key={cat._id + cat.name}
                  className="text-white"
                >
                  {cat}
                </NavLink>
              ))}
            </Nav>
          </Col>
          <Col>
            <h5 className="text-white">About</h5>
            <p>
              As a web developer, I am excited to present to you this demo
              e-commerce project built using the MERN stack. The MERN stack is a
              powerful combination of technologies that enables developers to
              build modern, scalable web applications quickly and efficiently.
              This e-commerce platform has been designed with the user
              experience in mind. It offers a wide range of high-quality
              products across various categories, and its user-friendly
              interface makes it easy for customers to browse and purchase
              products.
            </p>
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <p className="text-center">
            Design and developed by Pulasthi Chamikara Karundhipathi
          </p>
        </Row>
      </Container>
    </footer>
  );
}

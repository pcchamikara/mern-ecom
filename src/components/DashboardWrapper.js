import React from 'react';
import { Container } from 'react-bootstrap';

export default function DashboardWrapper({ children }) {
  return <Container className="py-5">{children}</Container>;
}

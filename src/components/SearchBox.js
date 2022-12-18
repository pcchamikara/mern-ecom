import React, { useState } from 'react';
import { Button, Col, Form, FormControl, Row, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`search/${search}`);
  };
  return (
    <>
      <Form className="d-flex" onSubmit={submitHandler}>
        <FormControl
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <Button type="submit" variant="warning">
          <i className="fa-solid fa-magnifying-glass"></i>
        </Button>
      </Form>
    </>
  );
}

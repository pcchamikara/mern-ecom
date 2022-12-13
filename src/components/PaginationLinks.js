import React from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PaginationLinks({ pages, page, setPageNumber }) {
  let items = [];

  const paginationHanldle = (page) => {
    setPageNumber(page);
  };
  // genarate pagination items
  for (let number = 1; number <= pages; number++) {
    items.push(
      <li
        className={number === Number(page) ? ' page-item active' : 'page-item'}
        key={number}
      >
        <span
          className="page-link"
          style={{ cursor: 'pointer' }}
          onClick={() => paginationHanldle(number)}
        >
          {number}
        </span>
      </li>
    );
  }
  return <Pagination>{items}</Pagination>;
}

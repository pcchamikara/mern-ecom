import React from 'react';
import { useParams } from 'react-router-dom';

export default function TestScree() {
  const { id } = useParams();
  return <div>TestScree {id}</div>;
}

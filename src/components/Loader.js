import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function Loader() {
  const styles = {
    loader: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: '#ffffff7d',
      left: '0',
      top: '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      scrollBehavior: 'unset',
    },
  };
  return (
    <div className="loader" style={styles.loader}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

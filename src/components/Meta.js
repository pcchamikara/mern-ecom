import React from 'react';
import { Helmet } from 'react-helmet';

export default function Meta({ title, dis }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={dis} />
    </Helmet>
  );
}

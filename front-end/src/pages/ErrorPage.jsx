import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
export default function ErrorPage({ e }) {
  console.log('====================================');
  console.log(e);
  console.log('====================================');
  return (
    <div>Teste</div>
  );
}

ErrorPage.propTypes = {
  e: PropTypes.shape({}),
}.isRequired;

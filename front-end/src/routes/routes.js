import React from 'react';
import { Route } from 'react-router-dom';

import Login from '../pages/Login';
import Products from '../pages/Products';

function Routes() {
  return (
    <Routes>
      <Route render={ Login } path="/" exact />
      <Route render={ Products } path="/customer/products" />
    </Routes>
  );
}

export default Routes;

import React, { useEffect, useMemo, useState } from 'react';
import { node } from 'prop-types';
import AppContext from './app.context';
import { getProducts } from '../api/getters';
import { getSellers, getUsers } from '../routes/user.routes';

function AppProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data
        .map((product) => ({ ...product, quantity: 0 }))));

    getSellers()
      .then((data) => setSellers(data
        .map(({ name, id }) => ({ name, id }))));

    getUsers()
      .then((data) => setSellers(data
        .map(({ name, id, email, role }) => ({ name, id, email, role }))));
  }, []);

  function insertProduct(data) {
    return setProducts((prev) => prev.map((product) => {
      if (product.id === data.id) {
        return { ...product, quantity: product.quantity + 1 };
      } return { ...product };
    }));
  }

  function removeProduct(data) {
    if (data.quantity <= 0) {
      return setProducts((prev) => prev.map((product) => ({ ...product })));
    }

    return setProducts((prev) => prev.map((product) => {
      if (product.id === data.id) {
        return { ...product, quantity: product.quantity - 1 };
      } return { ...product };
    }));
  }

  function manualSetProduct(data) {
    const newQuantity = Number(data.quantity);
    if (Number.isNaN(newQuantity)) {
      return setProducts((prev) => prev.map((product) => ({ ...product })));
    }
    return setProducts((prev) => prev.map((product) => {
      if (product.id === data.id) {
        return { ...product, quantity: newQuantity };
      } return { ...product };
    }));
  }

  const context = useMemo(() => ({
    products,
    sellers,
    insertProduct,
    removeProduct,
    manualSetProduct,
  }), [products, sellers]);

  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;

AppProvider.propTypes = {
  children: node.isRequired,
};

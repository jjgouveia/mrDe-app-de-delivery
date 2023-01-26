import React, { useEffect, useMemo, useState } from 'react';
import { node } from 'prop-types';
import AppContext from './app.context';
import { getProducts } from '../api/getters';

function AppProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data.map((product) => ({ ...product, quantity: 0 }))));
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
    insertProduct,
    removeProduct,
    manualSetProduct,
  }), [products]);

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

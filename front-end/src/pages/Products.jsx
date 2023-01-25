import React, { useEffect, useState } from 'react';
import NavBar from '../componentes/navbar';
import CardProducts from '../componentes/cardProducts';
import { getProducts } from '../api/getters';

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    getProducts().then((response) => {
      setAllProducts(response);
    });
  }, []);

  console.log(allProducts);

  return (
    <>
      <NavBar />
      <h1>Produtos</h1>
      <div>
        {
          allProducts.map((product) => (<CardProducts
            product={ product }
            key={ product.id }
          />))
        }
      </div>
    </>
  );
}

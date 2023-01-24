import React from 'react';
import NavBar from '../componentes/navbar';
import CardProducts from '../componentes/cardProducts';
import dataProducts from '../Data _test/dataProducts';

export default function Products() {
  return (
    <>
      <NavBar />
      <h1>Produtos</h1>
      <div>
        {
          dataProducts.map((product) => (<CardProducts
            product={ product }
            key={ product.id }
          />))
        }
      </div>
    </>
  );
}

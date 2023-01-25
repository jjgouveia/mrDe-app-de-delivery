import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './cardProducts.css';
import { getImage } from '../api/getters';

export default function CardProducts(props) {
  const [image, setImage] = useState('');

  const { product } = props;

  const [value, setValue] = useState(0);

  useEffect(() => {
    getImage(product.url_image).then((response) => {
      setImage(response);
    });
  }, [product.url_image]);

  return (
    <div>
      <h3
        data-testid={ `customer_products__element-card-title-${product.id}` }
      >
        { product.name }
      </h3>

      <img
        className="product-img"
        data-testid={ `customer_products__img-card-bg-image-${product.id}` }
        src={ image }
        alt="imagem do produto"
      />
      <div>
        <p>
          R$
        </p>
        <p
          data-testid={ `customer_products__element-card-price-${product.id}` }
        >
          { product.price.replace(/\./, ',') }
        </p>
      </div>

      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${product.id}` }
      >
        Adicionar
      </button>

      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${product.id}` }
      >
        Remover
      </button>

      <input
        type="number"
        data-testid={ `customer_products__input-card-quantity-${product.id}` }
        value={ value }
        onChange={ (e) => setValue(e.target.value) }
      />
    </div>
  );
}

CardProducts.propTypes = {
  product: PropTypes.objectOf(Object).isRequired,
};

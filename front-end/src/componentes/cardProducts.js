import React from 'react';
import PropTypes from 'prop-types';
import './cardProducts.css';

export default function CardProducts(props) {
  const { product } = props;
  return (
    <div
      data-testid={ `customer_products__element-card-price-${product.id}` }
    >
      <h3
        data-testid={ `customer_products__element-card-title-${product.id}` }
      >
        { product.name }
      </h3>

      <img
        id="product-img"
        data-testid={ `customer_products__img-card-bg-image-${product.id}` }
        src={ product.url_image }
        alt="imagem do produto"
      />

      <p
        data-testid={ `customer_products__element-card-price-${product.id}` }
      >
        { product.price }
      </p>

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
      />
    </div>
  );
}

CardProducts.propTypes = {
  product: PropTypes.objectOf(Object).isRequired,
};

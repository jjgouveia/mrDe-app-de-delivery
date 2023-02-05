import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './cardProducts.css';
import { getImage } from '../api/getters';
import AppContext from '../context/app.context';

export default function CardProducts(props) {
  const [image, setImage] = useState('');
  const service = useContext(AppContext);

  const { product, addLocalStorage, updateTotal } = props;

  const { id, name, price, quantity } = product;

  function addItem() {
    const data = { id, name, price, quantity };
    service.insertProduct(data);
  }

  function removeItem() {
    const data = { id, name, price, quantity };
    service.removeProduct(data);
  }

  function changeManualQuantity({ target }) {
    const data = { id, name, price, quantity };
    data.quantity = target.value;
    service.manualSetProduct(data);
  }

  useEffect(() => {
    getImage(product.url_image).then((response) => {
      setImage(response);
    });
  }, [product]);

  useEffect(() => {
    addLocalStorage(product, quantity);
    updateTotal();
  }, [addLocalStorage, product, quantity, updateTotal]);

  return (
    <div className="card-product">
      <div className="price">
        <span>
          R$
          { ' ' }
        </span>
        <span
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          { product.price.replace(/\./, ',') }
        </span>
      </div>
      <img
        className="product-img"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ image }
        alt="imagem do produto"
      />

      <p
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        { name }
      </p>

      <div className="controls">
        <button
          onClick={ addItem }
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
        >
          +
        </button>

        <input
          type="text"
          data-testid={ `customer_products__input-card-quantity-${id}` }
          value={ quantity }
          onChange={ changeManualQuantity }
        />

        <button
          onClick={ removeItem }
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
        >
          -
        </button>
      </div>

    </div>
  );
}

CardProducts.propTypes = {
  product: PropTypes.objectOf(Object).isRequired,
  addLocalStorage: PropTypes.func.isRequired,
  updateTotal: PropTypes.func.isRequired,
};

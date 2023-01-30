import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';
import CardProducts from '../components/cardProducts';
import AppContext from '../context/app.context';
import TotalAmount from '../components/totalAmount';

function updateTotal(setTotalPrice) {
  if (localStorage.getItem('carrinho')) {
    const t = JSON.parse(localStorage.getItem('carrinho'));
    const total = t.reduce((acc, att) => acc + att.subTotal, 0);
    setTotalPrice(total);
  }
}

function aux(cart, product, productCart) {
  if (!cart) {
    localStorage.setItem('carrinho', JSON.stringify([productCart]));
  } else {
    let newCart = null;
    const validate = cart && cart.some((produ) => produ.productId === product.id);

    if (validate) {
      cart.forEach((el) => {
        if (el.productId === product.id) {
          el.quantity = Number(productCart.quantity);
          el.subTotal = Number(productCart.quantity) * product.price;
        }
      });
      newCart = cart;
    } else {
      newCart = [...cart, productCart];
    }

    localStorage.setItem('carrinho', JSON.stringify(newCart));
  }
}

function addProductCartLocalStorage(product, quant) {
  const num = -1;
  if (quant > num) {
    const productCart = {
      productId: product.id,
      name: product.name,
      quantity: quant,
      unitPrice: product.price,
      subTotal: quant * product.price,
    };

    const cart = JSON.parse(localStorage.getItem('carrinho'));
    aux(cart, product, productCart);
  } else {
    const cart = JSON.parse(localStorage.getItem('carrinho'));
    const validate = cart && cart.some((produ) => produ.productId === product.id);
    if (validate) {
      const newCart = cart.filter((el) = el.productId !== product.id);
      console.log(newCart);
      localStorage.setItem('carrinho', JSON.stringify(newCart));
    }
  }
}

export default function Products() {
  const { products } = useContext(AppContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  function redirect() {
    navigate('/customer/checkout');
  }

  return (
    <>
      <NavBar />
      <h1>Produtos</h1>
      <TotalAmount />
      <div>
        {
          products && products?.map((product) => (
            <CardProducts
              addLocalStorage={ addProductCartLocalStorage }
              updateTotal={ () => updateTotal(setTotalPrice) }
              product={ product }
              key={ product.id }
            />))
        }
      </div>
      <span>Total: R$ </span>
      <span
        data-testid="customer_products__checkout-bottom-value"
      >
        { String(totalPrice.toFixed(2)).replace('.', ',') }
      </span>

      <span>Carrinho: </span>
      <button
        onClick={ redirect }
        data-testid="customer_products__button-cart"
        type="button"
      >
        { String(totalPrice.toFixed(2)).replace('.', ',') }

      </button>
    </>
  );
}

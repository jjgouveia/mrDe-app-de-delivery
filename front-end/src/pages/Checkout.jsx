import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import NavBar from '../components/navbar';
import OrderProducts from '../components/OrderProducts';
import { requestOrder } from '../routes/order.routes';

const STATUS_CREATED = 201;

const names = ['Isabelly', 'Jadson', 'Japhé'];

function Checkout() {
  const { register, handleSubmit } = useForm();
  const redirect = useNavigate();

  const c1 = JSON.parse(localStorage.getItem('carrinho')).filter((e) => e.quantity > 0);
  const [cart, setCart] = useState(c1.map((cp, i) => ({ id: i, ...cp })));
  const [aux, setAux] = useState(true);
  const totalPrice = cart
    .reduce((acc, curr) => acc + curr.subTotal, 0).toFixed(2).toString();

  const user = JSON.parse(localStorage.getItem('user'));

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const [order, setOrder] = useState({
    userId: user?.id,
    sellerId: 1,
    totalPrice,
    saleDate: today.toUTCString(),
    status: 'Pendente',
  });

  async function onSubmit(data) {
    const request = await requestOrder({ ...order, ...data }, user?.token);
    if (request.status === STATUS_CREATED) {
      setOrder(request.data);
      redirect(`/customer/orders/${request.data.id}`);
    }
  }

  // const carProducts = JSON
  //   .parse(localStorage.getItem('carrinho')).filter((e) => e.quantity > 0);
  // const carProductsWithId = carProducts.map((cp, i) => ({ id: i, ...cp }));

  useEffect(() => {
    const c2 = JSON.parse(localStorage.getItem('carrinho')).filter((e) => e.quantity > 0);
    setCart(c2.map((cp, i) => ({ id: i, ...cp })));
  }, [aux]);

  return (
    <div>
      <NavBar />
      <h1>
        Finalizar pedido
      </h1>
      <div>
        {cart.map((checkoutOrder) => (<OrderProducts
          product={ checkoutOrder }
          key={ checkoutOrder.productId }
          updateCheckout={ { setAux, aux } }
        />))}
      </div>
      <div>
        <strong>Total: </strong>
        <span>R$ </span>
        {' '}
        <span data-testid="customer_checkout__element-order-total-price">
          {totalPrice.replace(/\./, ',')}
        </span>
      </div>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <h1>
          Detalhes de Endereço para Entrega
        </h1>
        <div>
          <p>
            P. Vendedora Responsável:
          </p>
          <select
            data-testid="customer_checkout__select-seller"
            name="select"
            // { ...register('sellerId') }
          >
            {names.map((name, index) => (<option key={ index }>{name}</option>))}
          </select>
        </div>
        <div>
          <p>
            Endereço
          </p>
          <input
            data-testid="customer_checkout__input-address"
            type="text"
            { ...register('deliveryAddress') }
          />
        </div>
        <div>
          <p>
            Número
          </p>
          <input
            data-testid="customer_checkout__input-address-number"
            type="text"
            { ...register('deliveryNumber') }
          />
        </div>
        <div>
          <button
            data-testid="customer_checkout__button-submit-order"
            type="submit"
          >
            FINALIZAR PEDIDO
          </button>
        </div>
      </form>
    </div>
  );
}
export default Checkout;

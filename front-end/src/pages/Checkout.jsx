import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import NavBar from '../components/navbar';
import OrderProducts from '../components/OrderProducts';
import { requestOrder } from '../routes/order.routes';
import AppContext from '../context/app.context';

const STATUS_CREATED = 201;

function Checkout() {
  const { sellers } = useContext(AppContext);
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
    products: cart,
    userId: user?.id,
    totalPrice,
    saleDate: today,
    status: 'Pendente',
  });

  async function onSubmit(data) {
    const { sellerId } = data;
    localStorage.setItem('data', JSON.stringify({ ...order, sellerId }));
    const request = await requestOrder({ ...order, ...data }, user?.token);
    if (request.status === STATUS_CREATED) {
      setOrder(request.data.id);
      redirect(`/customer/orders/${request.data.id}`);
    }
  }

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
        {cart.map((checkoutOrder) => (
          <OrderProducts
            product={ checkoutOrder }
            key={ checkoutOrder.productId }
            updateCheckout={ { setAux, aux } }
          />
        ))}
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
            { ...register('sellerId') }
          >
            { sellers?.map(({ name, id }) => (
              <option key={ id } value={ id }>{name}</option>))}
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

import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import NavBar from '../components/navbar';
import OrderProducts from '../components/OrderProducts';
import { registerSale } from '../routes/order.routes';
import AppContext from '../context/app.context';
import '../css/Checkout.css';

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
    const newSale = await registerSale({ ...order, ...data }, user?.token);
    if (newSale.status === STATUS_CREATED) {
      setOrder(newSale.data.id);
      redirect(`/customer/orders/${newSale.data.id}`);
    }
  }

  useEffect(() => {
    const c2 = JSON.parse(localStorage.getItem('carrinho')).filter((e) => e.quantity > 0);
    setCart(c2.map((cp, i) => ({ id: i, ...cp })));
  }, [aux]);

  return (
    <div>
      <NavBar />
      <div className="cards-orders">
        <h1 className="title-order">
          Revisar pedido -
          { ' ' }
          <span>
            Total: R$
            { ' ' }
            <span data-testid="customer_checkout__element-order-total-price">
              {totalPrice.replace(/\./, ',')}
            </span>
          </span>
        </h1>
        <table className="header-table">
          <tr
            className="card-order"
            // style={ {
            //   padding: ,
            // } }
          >
            <th className="elem-order aux3">Item</th>
            <th
              className="elem-order diferente aux2"
              style={ {
                backgroundColor: 'rgb(158, 79, 238)',
                color: 'white',
              } }
            >
              Descrição
            </th>
            <th className="elem-order aux3">Qnt</th>
            <th className="elem-order aux3">Unidade</th>
            <th className="elem-order aux3">Total</th>
            <th className="elem-order aux3">rem</th>
          </tr>
        </table>
        {cart.map((checkoutOrder) => (
          <OrderProducts
            product={ checkoutOrder }
            key={ checkoutOrder.productId }
            updateCheckout={ { setAux, aux } }
          />
        ))}
      </div>
      <form className="field" onSubmit={ handleSubmit(onSubmit) }>
        <h1 className="legenda">Detalhes de Endereço para Entrega</h1>
        <div className="cont-field">
          <div className="cont-field-elems">
            <p className="sub-titles">
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
          <div className="cont-field-elems input-diferente">
            <p className="sub-titles">
              Endereço
            </p>
            <input
              className="input-diferente"
              placeholder="Travessa Terceira..."
              data-testid="customer_checkout__input-address"
              type="text"
              { ...register('deliveryAddress') }
            />
          </div>
          <div className="cont-field-elems outro-input">
            <p className="sub-titles">
              Número
            </p>
            <input
              className="input-diferente outro-input"
              placeholder="198"
              data-testid="customer_checkout__input-address-number"
              type="text"
              { ...register('deliveryNumber') }
            />
          </div>
        </div>
        <div className="box-button">
          <button
            className="btn-finalizar"
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

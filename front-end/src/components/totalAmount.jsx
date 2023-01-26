import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/app.context';

function TotalAmount() {
  const { products } = useContext(AppContext);
  const navigate = useNavigate();

  const totalValue = products && products
    .map((product) => product.price * product.quantity)
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2)
    .replace('.', ',');

  return (
    <div>
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => { navigate('/customer/checkout'); } }
        disabled={ totalValue === (0).toFixed(2).replace('.', ',') }
      >
        <span>Ver Carrinho: R$</span>
        {`${totalValue || 0}`}
      </button>
    </div>
  );
}

export default TotalAmount;

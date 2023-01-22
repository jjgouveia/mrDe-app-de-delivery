import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { schemaLogin } from '../validations/schemas';

export default function Login() {
  const NOT_FOUND = 404;
  const location = useLocation();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [loginErrorMessage, setLoginErrorMessage] = useState(false);
  const [loginValues, setLoginValues] = useState({
    email: '',
    password: '',
  });

  const validateInput = useCallback(
    async () => {
      try {
        await schemaLogin.validate(loginValues);
        setIsDisabled(false);
      } catch (error) {
        setIsDisabled(true);
      }
    },

    [loginValues],
  );

  const redirect = (role) => {
    if (role === 'seller') {
      navigate('/seller/orders');
    }
    navigate('/customer/products');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginValues),
    }).then((response) => {
      if (response.status === NOT_FOUND) {
        return response.status;
      }
      return response.json();
    })
      .then((data) => {
        if (data === NOT_FOUND) {
          setLoginErrorMessage(true);
        } else {
          redirect(data.role);
          localStorage.setItem('user', JSON.stringify({
            name: data.name,
            email: data.email,
            role: data.role,
            token: data.token }));
        }
      });
  };

  const handleChange = ({ target: { name, value } }) => {
    setLoginValues({ ...loginValues, [name]: value });
  };

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/login');
    }
  }, [location.pathname, navigate]);

  useEffect(
    () => {
      validateInput();
    },
    [loginValues, validateInput],
  );

  return (
    <div className="login-form-container">
      <h1>
        Zé Birita
      </h1>
      <form method="post" onSubmit={ (e) => handleSubmit(e) }>
        <div className="form-group">
          <label htmlFor="email">
            <span>Login</span>
            <input
              type="email"
              name="email"
              placeholder="Digite um email"
              data-testid="common_login__input-email"
              value={ loginValues.email }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="password">
            <span>Senha</span>
            <input
              type="password"
              name="password"
              placeholder="Digite a sua senha"
              data-testid="common_login__input-password"
              value={ loginValues.password }
              onChange={ handleChange }
              minLength={ 6 }
            />
          </label>
        </div>
        <div className="button-group-login">
          <button
            type="submit"
            data-testid="common_login__button-login"
            disabled={ isDisabled }
          >
            Login
          </button>
          <Link to="/register">
            <button
              data-testid="common_login__button-register"
              type="button"
            >
              Ainda não tenho conta
            </button>
          </Link>
        </div>
      </form>
      { loginErrorMessage && (
        <h2 data-testid="common_login__element-invalid-email">
          Usuário ou senha inválidos
        </h2>
      ) }
    </div>
  );
}

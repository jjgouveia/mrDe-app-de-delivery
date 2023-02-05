import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../routes/auth.routes';
import { loginSchema } from '../validations/schemas';
import '../css/Login.css';

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [loginErrorMessage, setLoginErrorMessage] = useState(false);
  const [loginValues, setLoginValues] = useState({
    email: '',
    password: '',
  });

  const user = JSON.parse(localStorage.getItem('user'));

  if (localStorage.getItem('user')) {
    navigate('/birita');
  }

  const validateInput = useCallback(
    async () => {
      try {
        await loginSchema.validate(loginValues);
        setIsDisabled(false);
      } catch (error) {
        setIsDisabled(true);
      }
    },

    [loginValues],
  );

  const redirect = (role) => {
    if (role === 'administrator') {
      navigate('/admin/manage');
    }
    if (role === 'customer') {
      navigate('/customer/products');
    }
    if (role === 'seller') {
      navigate('/seller/orders');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const request = await login(loginValues);
      localStorage.setItem('user', JSON.stringify({
        id: request.data.id,
        name: request.data.name,
        email: request.data.email,
        role: request.data.role,
        token: request.data.token,
      }));
      redirect(request.data.role);
    } catch (error) {
      setLoginErrorMessage(true);
    }
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

  useEffect(() => {
    if (user) {
      redirect(user?.role);
    }
  });

  return (
    <section className="form-container">
      <div className="boas-vindas">
        <div className="logoLogin">
          <img className="logo-login" src="https://img.freepik.com/vetores-premium/letra-d-cor-roxa-3d-logotipo-de-foguete-rapido-criativo_575535-373.jpg?w=2000" alt="logo" />
          {/* <h2>Sua Logo</h2>
          <p>seu slogan</p> */}
        </div>
        <h1>Seja bem vindo</h1>
        <p>Faça o login ou Inscreva-se</p>
      </div>
      <form method="post" onSubmit={ (e) => handleSubmit(e) }>
        <h2 className="titulo-login">Login</h2>
        <div className="form-group">
          <label htmlFor="email">
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
            className="login-btn"
            type="submit"
            data-testid="common_login__button-login"
            disabled={ isDisabled }
          >
            Login
          </button>
          <Link to="/register">
            <button
              className="criar-conta-btn"
              data-testid="common_login__button-register"
              type="button"
            >
              Criar conta
            </button>
          </Link>
        </div>
        {loginErrorMessage && (
          <p
            className="invalid"
            data-testid="common_login__element-invalid-email"
          >
            Usuário ou senha inválidos
          </p>
        )}
      </form>
    </section>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState(false);
  const [loginValues, setLoginValues] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginValues),
    }).then((response) => {
      if (response.status === 404) {
        return response.statusText;
      }
      return response.json();
    })
      .then((data) => {
        console.log(data);
        if (data === 'Not Found') {
          setErrorMessage(true);
        } else {
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
            />
          </label>
        </div>
        <div className="button-group-login">
          <button type="submit" data-testid="common_login__button-login">
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
      { errorMessage && (
        <h2 data-testid="common_login__element-invalid-email">
          Usuário ou senha inválidos
        </h2>
      ) }
    </div>
  );
}

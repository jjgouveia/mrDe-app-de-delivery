import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerSchema } from '../validations/schemas';
import '../css/Register.css';
// import { postRegister } from '../routes/register.routes';

export default function Register() {
  const USER_CONFLICT = 409;
  const navigate = useNavigate();
  const [registerValues, setRegisterValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [loginErrorMessage, setLoginErrorMessage] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setRegisterValues({ ...registerValues, [name]: value });
  };

  const validateInput = useCallback(
    async () => {
      try {
        await registerSchema.validate(registerValues);
        setIsDisabled(false);
      } catch (error) {
        setIsDisabled(true);
      }
    },

    [registerValues],
  );

  const redirect = (role) => {
    if (role === 'seller') {
      navigate('/seller/orders');
    }
    navigate('/customer/products');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerValues),
    }).then((response) => {
      if (response.status === USER_CONFLICT) {
        return response.status;
      }
      return response.json();
    })
      .then((data) => {
        if (data === USER_CONFLICT) {
          setLoginErrorMessage(true);
        } else {
          redirect(data.role);
          localStorage.setItem('user', JSON.stringify({
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
            token: data.token }));
        }
      });
  };

  useEffect(
    () => {
      validateInput();
    },
    [registerValues, validateInput],
  );

  return (
    <section className="form-container">
      <form method="post" onSubmit={ (e) => handleSubmit(e) }>
        <h1 className="title-cadastro">
          Cadastre-se
        </h1>
        <div className="form-group">
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              placeholder="Nome: Ex.: Ada Lovelace"
              data-testid="common_register__input-name"
              minLength={ 12 }
              value={ registerValues.name }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              placeholder="Email: Ex.: adalovelace@zebirita.com"
              data-testid="common_register__input-email"
              value={ registerValues.email }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              placeholder="Digite uma senha"
              data-testid="common_register__input-password"
              value={ registerValues.password }
              onChange={ handleChange }
            />
          </label>
        </div>
        <div className="container-register-button">
          <button
            className="cad-btn"
            type="submit"
            data-testid="common_register__button-register"
            disabled={ isDisabled }
          >
            Cadastrar
          </button>
        </div>
        { loginErrorMessage && (
          <p
            className="email-utilizado"
            data-testid="common_register__element-invalid_register"
          >
            Email já utilizado. Deseja
            {' '}
            <a href="/recover">recuperar a senha</a>
            {' '}
            ?
          </p>
        ) }
      </form>
    </section>
  );
}

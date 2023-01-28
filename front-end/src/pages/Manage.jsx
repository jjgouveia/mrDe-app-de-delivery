import React, { useCallback, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { registerSchema } from '../validations/schemas';
import NavBar from '../components/navbar';

export default function Manage() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [registerValues, setRegisterValues] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

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

  useEffect(
    () => {
      validateInput();
    },
    [registerValues, validateInput],
  );

  return (
    <div>
      <NavBar />
      <h1>Cadastrar novo usuário</h1>
      <form method="post" onSubmit={ (e) => handleSubmit(e) }>
        <div className="form-group">
          <label htmlFor="name">
            <span>Nome:</span>
            <input
              type="text"
              name="name"
              placeholder="Ex.: Ada Lovelace"
              data-testid="admin_manage__input-name"
              minLength={ 12 }
              value={ registerValues.name }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="email">
            <span>Email:</span>
            <input
              type="email"
              name="email"
              placeholder="Ex.: adalovelace@zebirita.com"
              data-testid="admin_manage__input-email"
              value={ registerValues.email }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="password">
            <span>Senha:</span>
            <input
              type="password"
              name="password"
              placeholder="Digite uma senha"
              data-testid="admin_manage__input-password"
              value={ registerValues.password }
              onChange={ handleChange }
            />
          </label>
        </div>
        <label htmlFor="role">
          <p>Type</p>
          <select
            type="role"
            name="role"
            value={ registerValues.role }
            onChange={ handleChange }
            data-testid="admin_manage__select-role"
          >
            <option>Vendedor</option>
            <option>Cliente</option>
          </select>
        </label>
        <div className="container-register-button">
          <button
            type="submit"
            data-testid="admin_manage__button-register"
            disabled={ isDisabled }
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}

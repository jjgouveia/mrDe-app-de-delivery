import React, { useCallback, useEffect, useState, useContext } from 'react';
import { registerSchema } from '../validations/schemas';
import NavBar from '../components/navbar';
import { postRegisterManager } from '../routes/register.routes';
import CardUsers from '../components/cardUsers';
import AppContext from '../context/app.context';
import '../css/Manage.css';

export default function Manage() {
  const { users, setUsers } = useContext(AppContext);

  const usersFiltered = users.filter((e) => e.role !== 'administrator');

  const USER_CONFLICT = 409;
  const [isDisabled, setIsDisabled] = useState(true);
  const [loginErrorMessage, setLoginErrorMessage] = useState(false);
  const [registerValues, setRegisterValues] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
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

  const handleSubmit = async (e) => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    e.preventDefault();
    const request = await postRegisterManager(registerValues, token);
    if (request === USER_CONFLICT) {
      setLoginErrorMessage(true);
    } else setUsers([...users, request.data]);
  };

  useEffect(
    () => {
      validateInput();
    },
    [registerValues, validateInput],
  );

  return (
    <div className="manager-container">
      <div className="navBar">
        <NavBar />
      </div>
      <div className="title">
        <h1>Cadastrar novo usuário</h1>
      </div>
      <form
        method="post"
        className="form-group-manage"
        onSubmit={ (e) => handleSubmit(e) }
      >
        <label htmlFor="name">
          <p>Nome:</p>
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
          <p>Email:</p>
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
          <p>Senha:</p>
          <input
            type="password"
            name="password"
            placeholder="Digite uma senha"
            data-testid="admin_manage__input-password"
            value={ registerValues.password }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="role">
          <p>Tipo</p>
          <select
            type="role"
            name="role"
            value={ registerValues.role }
            onChange={ handleChange }
            data-testid="admin_manage__select-role"
          >
            <option>seller</option>
            <option>customer</option>
          </select>
        </label>
        <div className="container-register-button">
          <button
            className="cad-btn"
            type="submit"
            data-testid="admin_manage__button-register"
            disabled={ isDisabled }
          >
            Cadastrar
          </button>
        </div>
      </form>
      { loginErrorMessage && (
        <h2 data-testid="admin_manage__element-invalid-register">
          Email já utilizado.
        </h2>

      ) }
      <div className="user-list-section">
        <div>
          <h1>
            Lista de usuários
          </h1>
        </div>
        <div className="user-main-container">
          {
            usersFiltered.map((u, i) => {
              const cardList = (
                <CardUsers
                  useDetails={ u }
                  key={ i }
                />
              );
              return cardList;
            })
          }
        </div>
      </div>
    </div>
  );
}

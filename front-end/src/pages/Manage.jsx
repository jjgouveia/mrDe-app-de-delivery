import React, { useCallback, useEffect, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import { registerSchema } from '../validations/schemas';
import NavBar from '../components/navbar';
import { postRegisterManager } from '../routes/register.routes';
import CardUsers from '../components/cardUsers';
import AppContext from '../context/app.context';

export default function Manage() {
  const { users, setUsers } = useContext(AppContext);

  // const usersFiltered = users.filter((e) => e.role !== 'administrator');

  // const [usersState, setUsers] = useState(users);

  // const [updateRender, setUpdateRender] = useState(0);

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
            <option>seller</option>
            <option>customer</option>
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
      { loginErrorMessage && (
        <h2 data-testid="admin_manage__element-invalid-register">
          Email já utilizado.
        </h2>

      ) }
      <section>
        <div>
          <h1>
            Lista de usuários
          </h1>
        </div>
        <div>
          {
            usersFiltered.map((u, i) => {
              const cardList = (
                <div key={ i }>
                  <CardUsers
                    useDetails={ u }
                    // update={ updateRender }
                  />

                </div>
              );
              return cardList;
            })
          }
        </div>
      </section>
    </div>
  );
}

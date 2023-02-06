import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { deleteUserById } from '../routes/user.routes';
import AppContext from '../context/app.context';
import '../css/UsersList.css';

function CardUsers(props) {
  const { setUsers } = useContext(AppContext);

  const handleDelete = async (id) => {
    const newUsers = await deleteUserById(id);
    setUsers([...newUsers.data]);
  };

  const { useDetails } = props;
  const { id, name, email, role } = useDetails;
  return (
    <div style={ { display: 'flex' } } className="user-container">
      <div style={ { display: 'flex' } } className="user-container-id">
        <span
          data-testid={ `admin_manage__element-user-table-item-number-${id}` }
        >
          { id }

        </span>
      </div>
      <div style={ { display: 'flex' } } className="user-container-name">
        <span data-testid={ `admin_manage__element-user-table-name-${id}` }>
          {name}
        </span>
      </div>
      <div style={ { display: 'flex' } } className="user-container-email">
        <span data-testid={ `admin_manage__element-user-table-email-${id}` }>
          {email}
        </span>
      </div>
      <div style={ { display: 'flex' } } className="user-container-role">
        <span
          data-testid={
            `admin_manage__element-user-table-role-${id}`
          }
        >
          {role}
        </span>
      </div>
      <div style={ { display: 'flex' } } className="user-container-button">
        <button
          data-testid={ `admin_manage__element-user-table-remove-${id}` }
          type="submit"
          onClick={ () => { handleDelete(id); } }
        >
          Remover
        </button>
      </div>
    </div>
  );
}
CardUsers.propTypes = {
  useDetails: PropTypes
    .objectOf(Object).isRequired,
};
export default CardUsers;

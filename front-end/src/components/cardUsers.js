import React from 'react';
import PropTypes from 'prop-types';
import { deleteUserById } from '../routes/user.routes';

async function handleDelete(id) {
  await deleteUserById(id);
}

function CardUsers(props) {
  const borderSolidBlac = '2px solid black';
  const { useDetails } = props;
  const { id, name, email, role } = useDetails;
  return (
    <div style={ { display: 'flex', padding: '10px', textAlign: 'center' } }>
      <div style={ { border: borderSolidBlac, padding: '2px' } }>
        <strong>Item: </strong>
        { ' ' }
        <span
          data-testid={ `admin_manage__element-user-table-item-number-${id}` }
        >
          { id }

        </span>
      </div>
      <div style={ { border: borderSolidBlac, padding: '2px' } }>
        <strong>Nome </strong>
        { ' ' }
        <span data-testid={ `admin_manage__element-user-table-name-${id}` }>
          {name}
        </span>
      </div>
      <div style={ { border: borderSolidBlac, padding: '2px' } }>
        <strong>Email </strong>
        { ' ' }
        <span data-testid={ `admin_manage__element-user-table-email-${id}` }>
          {email}
        </span>
      </div>
      <div style={ { border: borderSolidBlac, padding: '2px' } }>
        <strong>Tipo </strong>
        { ' ' }
        <span
          data-testid={
            `admin_manage__element-user-table-role-${id}`
          }
        >
          {role}
        </span>
      </div>
      <div style={ { border: borderSolidBlac, padding: '2px' } }>
        <strong>Remover item: </strong>
        { ' ' }
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
  // useDetails: PropTypes
  //   .objectOf(Object),
};

// CardUsers.defaultProps = {
//   useDetails: {
//     aux: true,
//     setAux: () => {},
//     role: 'customer',
//   },
// };

export default CardUsers;

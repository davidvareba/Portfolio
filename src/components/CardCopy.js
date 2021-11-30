import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteItem } from '../api/data/itemData';

export default function Card({ card }) {
  const handleClick = (method) => {
    if (method === 'delete') {
      deleteItem(card).then(console.warn('deleted'));
    }
  };

  return (
    <div>
      <div className="card" style={{ width: '18rem', margin: '3px' }}>
        <div className="card-body">
          <h5 className="card-title">{card.name}</h5>
          {/* <p className="card-text">{card.imageUrl}</p> */}
          <p className="card-text">{card.description}</p>
          <Link to={`/edit/${card.firebaseKey}`} className="btn btn-warning">
            Edit
          </Link>
          <Link to={`/detail/${card.firebaseKey}`} className="btn btn-warning">
            Description
          </Link>
          <button
            onClick={() => handleClick('delete')}
            className="btn btn-danger"
            type="button"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.shape(PropTypes.obj).isRequired,
};

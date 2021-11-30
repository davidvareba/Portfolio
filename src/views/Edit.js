import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import ItemForm from '../components/ItemForm';
import { getItemsFB } from '../api/data/itemData';

export default function Edit({ userId }) {
  const [editItem, setEditItem] = useState({});
  const { firebaseKey } = useParams();

  useEffect(() => {
    getItemsFB(firebaseKey).then(setEditItem);
  }, []);

  return (
    <div>
      <ItemForm obj={editItem} userId={userId} />
    </div>
  );
}

Edit.propTypes = {
  userId: PropTypes.string,
};

Edit.defaultProps = { userId: {} };

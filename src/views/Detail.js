import React from 'react';
import { useParams } from 'react-router';
import CardDetail from '../components/CardDetail';

export default function Detail() {
  const { firebaseKey } = useParams();
  return (
    <>
      <h1 className="form-label visually-hidden">user id {firebaseKey}</h1>
      <CardDetail uid={firebaseKey} />
    </>
  );
}

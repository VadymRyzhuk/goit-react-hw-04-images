import React from 'react';
import css from './ErrorMessage.module.css';

export const ErrorMessage = ({ error }) => {
  console.log(error);
  return (
    <div className={css.error}>
      <p className={css.messageErrorP}>Oops, some error occured... {error}</p>
    </div>
  );
};

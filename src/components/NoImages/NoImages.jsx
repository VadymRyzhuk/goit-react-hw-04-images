import React from 'react';
import css from './NoImages.module.css';

const NoImages = () => {
  return (
    <div className={css.notFound}>
      <p className={css.notFoundP}>No images found!</p>
    </div>
  );
};

export { NoImages };

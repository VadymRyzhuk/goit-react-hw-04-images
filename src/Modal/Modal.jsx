import React, { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ modalData, closeModal }) => {
  useEffect(() => {
    const handleKeyPress = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [closeModal]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <img src={modalData.largeImageURL} alt="" className={css.modalImg} />
    </div>
  );
};

export { Modal };

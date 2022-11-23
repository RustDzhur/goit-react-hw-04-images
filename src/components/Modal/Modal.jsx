import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

export function Modal({ largeImageURL, tags, toggleModal }) {
  useEffect(() => {
    //закрытие модалки, когда кликаем Escape
    const handlKeyDown = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };
    window.addEventListener('keydown', handlKeyDown);
    return () => {
      window.removeEventListener('keydown', handlKeyDown);
    };
  }, [toggleModal]);

  //Закрытие модалки, когда кликаем по оверлэю
  const handleClodeModalByClickOnOverlay = e => {
    if (e.target !== e.currentTarget) {
      toggleModal();
    }
  };

  return createPortal(
    <div className="overlay" onClick={handleClodeModalByClickOnOverlay}>
      <div className="modal">
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

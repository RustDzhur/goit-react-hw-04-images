import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handlKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlKeyDown);
  }

  //закрытие модалки, когда кликаем Escape
  handlKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  //Закрытие модалки, когда кликаем по оверлэю
  handleClodeModalByClickOnOverlay = e => {
    if (e.target !== e.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;
    return createPortal(
      <div className="overlay" onClick={this.handleClodeModalByClickOnOverlay}>
        <div className="modal">
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}


Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
}
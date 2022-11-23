import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isOpenModal: false,
    idx: 0,
  };

  //тоглим стейт для открытия и закрытия модалки + записываем ID
  handleModal = id => {
    this.setState(({ isOpenModal }) => ({
      isOpenModal: !isOpenModal,
      idx: id,
    }));
  };

  render() {
    const { searchResult } = this.props;
    const { isOpenModal, idx } = this.state;

    return (
      <>
        {searchResult.map(({ id, webformatURL, largeImageURL, tags }) => (
          <li
            key={id}
            className="gallery-item"
            onClick={() => this.handleModal(id)}
          >
            <img
              src={webformatURL}
              alt={tags}
              className="imageGalleryItem-image"
            />
            {idx === id && isOpenModal && (
              <Modal
                largeImageURL={largeImageURL}
                tags={tags}
                toggleModal={this.handleModal}
              />
            )}
          </li>
        ))}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  isOpenModal: PropTypes.bool,
  idx: PropTypes.number,
  searchResult: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};

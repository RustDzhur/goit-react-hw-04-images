import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';

export function ImageGalleryItem ({searchResult}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [idx, setIdx] = useState(0)

  //тоглим стейт для открытия и закрытия модалки + записываем ID
  const handleModal = id => {
    setIsOpenModal(!isOpenModal);
    setIdx(id)
  };

    return (
      <>
        {searchResult.map(({ id, webformatURL, largeImageURL, tags }) => (
          <li
            key={id}
            className="gallery-item"
            onClick={() => handleModal(id)}
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
                toggleModal={handleModal}
              />
            )}
          </li>
        ))}
      </>
    );
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

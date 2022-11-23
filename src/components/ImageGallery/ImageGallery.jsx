import { ImageGalleryItem } from './ImageGalleryItem';


export const ImageGallery = ({ searchResult, loadMore }) => {
  return (
    <div>
      <ul className="gallery App">
        <ImageGalleryItem searchResult={searchResult} loadMore={loadMore} />
      </ul>
    </div>
  );
};

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { Loader } from 'components/Loader/Loader';
import { Searchbar } from '../components/Searchbar';
import { ImageGallery } from '../components/ImageGallery';
import { LoadMoreBtn } from 'components/LoadMore/LoadMore';

export function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hideBtn, setHideBtn] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    axios
      .get(
        `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=30083397-78010dc0c03f4e3cc974487c6&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        if (response.data.total > 0) {
          setSearchResult(prevState => [...prevState, ...response.data.hits]);
          setIsLoading(false);
          setHideBtn(false);
          toast.success(`We found ${response.data.totalHits} images`);
        }
        if (response.data.total === 0) {
          toast.warning('We cannot show any images!!!');
          setIsLoading(false);
        }
        if (response.data.hits === 0) {
          toast.warning('We cannot show any images!!!');
          setIsLoading(true);
        }
        // Прячем кнопку, если больше нет изображение для загрузки
        if (response.data.hits.length === 0) {
          setHideBtn(true);
          toast.error('We have not any IMAGES to show you');
        }
      });
  }, [page, searchQuery]);

  const handleGetSearchQuery = result => {
    setSearchResult([]);
    setIsLoading(true);
    setHideBtn(false);
    setPage(1);
    setSearchQuery(result);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    setIsLoading(true);
  };

  return (
    <>
      <Searchbar onSubmit={handleGetSearchQuery} />
      <ImageGallery searchResult={searchResult} loadMore={loadMore} />
      {searchResult.length > 0 && !isLoading && (
        <LoadMoreBtn loadMore={loadMore} hideBtn={hideBtn} />
      )}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {isLoading && (
        <div className="loader">
          <Loader />
        </div>
      )}
    </>
  );
}

App.propTypes = {
  url: PropTypes.string,
  key: PropTypes.string,
  searchQuery: PropTypes.object,
  page: PropTypes.number,
  per_page: PropTypes.number,
  isLoading: PropTypes.bool,
};

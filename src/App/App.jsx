import { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types'
import { Loader } from 'components/Loader/Loader';
import { Searchbar } from '../components/Searchbar';
import { ImageGallery } from '../components/ImageGallery';
import { LoadMoreBtn } from 'components/LoadMore/LoadMore';

export class App extends Component {
  state = {
    searchResult: [],
    url: 'https://pixabay.com/',
    key: '30083397-78010dc0c03f4e3cc974487c6',
    searchQuery: null,
    page: 1,
    per_page: 12,
    isLoading: false,
    hideBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { url, searchQuery,searchResult, key, per_page, page } = this.state;
    try {
      if (
        prevState.searchQuery !== this.state.searchQuery ||
        prevState.page !== this.state.page
      ) {
        axios
          .get(
            `${url}/api/?q=${searchQuery}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=${per_page}`
          )
          .then(response => {
            if (response.data.total === 0) {
              toast.warning('We cannot show any images!!!');
              this.setState({isLoading: false}) 
            }

            if (response.data.hits === 0) {
              
              toast.warning('We cannot show any images!!!');
              this.setState({isLoading: true}) 
            }
            if (response.data.total > 0) {
              this.setState(prevState => ({
                searchResult: [
                  ...prevState.searchResult,
                  ...response.data.hits,
                ],
                isLoading: false,
                hideBtn: false,
              }));
              toast.success(`We found ${response.data.totalHits} images`);
            }

            //Прячем кнопку, если больше нет изображение для загрузки
            if (searchResult.length === response.data.totalHits) {
              this.setState({hideBtn: true})
              toast.error('We have not any IMAGES to show you');
            }
          });
      }
    } catch (error) {
      toast.error('Somthing went WRONG');
    }
  }

  handleGetSearchQuery = result => {
    this.setState({
      searchQuery: result,
      page: 1,
      searchResult: [],
      isLoading: true,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }));
  };

  render() {
    const { searchResult, isLoading, hideBtn } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleGetSearchQuery} />
        <ImageGallery searchResult={searchResult} loadMore={this.loadMore} />
        {searchResult.length > 0 && !isLoading && (
          <LoadMoreBtn loadMore={this.loadMore} hideBtn={hideBtn} />
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
}


App.propTypes = {
  url: PropTypes.string,
  key: PropTypes.string,
  searchQuery: PropTypes.object,
  page: PropTypes.number,
  per_page: PropTypes.number,
  isLoading: PropTypes.bool,
}
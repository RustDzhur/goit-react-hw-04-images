import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { SearchbarLayout } from './SearchbarLayout';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  changeSearchQuery = e => {
    const search = e.currentTarget.value;
    this.setState({ searchQuery: search });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery === '') {
      toast.info('Enter Search Query pleese!!!');
    } else {
      this.props.onSubmit(this.state.searchQuery);
      this.resetSearchForm();
    }
  };

  resetSearchForm = () => {
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <SearchbarLayout
        handleSubmit={this.handleSubmit}
        changeSearchQuery={this.changeSearchQuery}
        state={this.state.searchQuery}
      />
    );
  }
}


Searchbar.propTypes = {
  searchQuery: PropTypes.string,
  search: PropTypes.string
}
import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { SearchbarLayout } from './SearchbarLayout';

export function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const changeSearchQuery = e => {
    const search = e.currentTarget.value;
    setSearchQuery(search);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery === '') {
      toast.info('Enter Search Query pleese!!!');
    } else {
      onSubmit(searchQuery);
      resetSearchForm();
    }
  };

  const resetSearchForm = () => {
    setSearchQuery('');
  };

  return (
    <SearchbarLayout
      onSubmit={handleSubmit}
      changeSearchQuery={changeSearchQuery}
      searchQuery={searchQuery}
    />
  );
}

Searchbar.propTypes = {
  searchQuery: PropTypes.string,
  search: PropTypes.string,
};

import { ReactComponent as SearchLogo } from '../../images/searchLogo.svg';
export const SearchbarLayout = ({onSubmit, searchQuery, changeSearchQuery}) => {
    return (
        <header className="searchbar">
        <form className="searchForm" onSubmit={onSubmit}>
          <button type="submit" className="searchForm-button">
            <SearchLogo />
          </button>

          <input
            className="searchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={changeSearchQuery}
          />
        </form>
      </header>
    )
}
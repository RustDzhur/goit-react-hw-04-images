import { ReactComponent as SearchLogo } from '../../images/searchLogo.svg';
export const SearchbarLayout = ({handleSubmit, state, changeSearchQuery}) => {
    return (
        <header className="searchbar">
        <form className="searchForm" onSubmit={handleSubmit}>
          <button type="submit" className="searchForm-button">
            <SearchLogo />
          </button>

          <input
            className="searchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={state}
            onChange={changeSearchQuery}
          />
        </form>
      </header>
    )
}
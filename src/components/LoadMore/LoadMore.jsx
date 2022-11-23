export const LoadMoreBtn = ({ loadMore, hideBtn }) => {
  return (
    <button
      style={{ display: hideBtn ? 'none' : 'block' }}
      type="button"
      onClick={loadMore}
      className="button"
    >
      LOAD MORE
    </button>
  );
};

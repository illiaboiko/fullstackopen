const SearchForm = ({ onSubmit, onChange, value }) => {
  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <label htmlFor="searchField">Search Countries</label>
          <input
            type="text"
            id="searchField"
            value={value}
            onChange={onChange}
          />
        </form>
      </div>
    </>
  );
};

export default SearchForm;

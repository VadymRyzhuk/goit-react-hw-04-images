import css from './Searchbar.module.css';
const Searchbar = ({ handleSubmit }) => {
  return (
    <div>
      <header className={css.searchbar}>
        <form onSubmit={handleSubmit} className={css.form}>
          <button type="submit" className={css.buttonSearch}>
            <span className="button-label">Search</span>
          </button>

          <input
            className={css.inputSearch}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchInput"
            required
          />
        </form>
      </header>
    </div>
  );
};

export { Searchbar };

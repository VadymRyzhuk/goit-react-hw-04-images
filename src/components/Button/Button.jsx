import css from './Button.module.css';

const Button = ({ onLoadMoreClick }) => {
  return (
    <div className={css.centeredBtn}>
      <button type="button" onClick={onLoadMoreClick} className={css.loadMore}>
        Load more
      </button>
    </div>
  );
};

export { Button };

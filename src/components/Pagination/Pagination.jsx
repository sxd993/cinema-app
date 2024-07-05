import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrentPage } from '../../slice/moviesSlice';
import classes from './Pagination.module.css';

export const Pagination = ({ totalPages }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.movies.currentPage);
  const [inputPage, setInputPage] = useState(currentPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(changeCurrentPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(changeCurrentPage(currentPage + 1));
    }
  };

  const handleChangePage = (e) => {
    const value = e.target.value;
    setInputPage(value);

    setTimeout(() => {
      if (value !== undefined && value >= 1 && value <= totalPages) {
        dispatch(changeCurrentPage(parseInt(value, 10)));
      }
    }, 1000);

  };

  const handleBlur = () => {
    setInputPage(currentPage);
  };

  return (
    <div className={classes.pagination}>
      <button onClick={handlePrevPage}>Previous Page</button>
      <input
        type="number"
        value={inputPage}
        onChange={handleChangePage}
        onBlur={handleBlur}
        min="1"
        max={totalPages}
        className={classes.input}
      />
      <span> of {totalPages} </span>
      <button onClick={handleNextPage}>Next Page</button>
    </div>
  );
};

export default Pagination;

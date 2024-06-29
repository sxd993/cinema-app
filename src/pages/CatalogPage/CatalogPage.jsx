import React, { useEffect } from 'react';
import classes from './CatalogPage.module.css';
import { CatalogList } from '../../components/Catalog/CatalogList/CatalogList';
import { fetchMovies, changeCurrentPage } from '../../slice/moviesSlice';
import { useDispatch, useSelector } from 'react-redux';

export const CatalogPage = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const status = useSelector((state) => state.movies.status);
  const currentPage = useSelector((state) => state.movies.currentPage);

  useEffect(() => {
    dispatch(fetchMovies(currentPage));
  }, [dispatch, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(changeCurrentPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < 500) {
      dispatch(changeCurrentPage(currentPage + 1));
    }
  };

  return (
    <>
      <div className={classes.catalogTitle}>
        <h2>Welcome back!</h2>
        <h3>Checkout the catalog of movies</h3>
      </div>
      {/* ХЗ ОН ДОЛЖЕН КОГДА ТО ЗАРАБОТАТЬ <div className={classes.searchBar}>
        <label htmlFor="searchFilm"></label>
        <input type="search" id='searchFilm' placeholder='Search' />
      </div> */}
      <div className={classes.catalogContainer}>
        <div className={classes.movieGridContainer}>
          {status === 'loading' ? (
            <p>Loading...</p>
          ) : (
            <>
              <CatalogList movies={movies} />
              <div className={classes.pagination}>
                <button onClick={handlePrevPage}>Previous Page</button>
                <div className={classes.pagination_current_page}><p>{currentPage}</p></div>
                <button onClick={handleNextPage}>Next Page</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CatalogPage;

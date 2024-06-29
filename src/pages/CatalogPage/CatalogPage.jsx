import React, { useEffect } from 'react';
import classes from './CatalogPage.module.css';
import { CatalogList } from '../../components/Catalog/CatalogList/CatalogList';
import { fetchMovies } from '../../slice/moviesSlice';
import { useDispatch, useSelector } from 'react-redux';

export const CatalogPage = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const status = useSelector((state) => state.movies.status);

  useEffect(() => {
    if (status === null) {
      dispatch(fetchMovies());
    }
  }, [dispatch, status]);

  return (
    <>
      <div className={classes.catalogTitle}>
        <h2>Welcome back!</h2>
        <h3>Checkout the catalog of movies</h3>
      </div>
      <div className={classes.searchBar}>
        <label htmlFor="searchFilm"></label>
        <input type="search" id='searchFilm' placeholder='Search' />
      </div>
      <div className={classes.catalogContainer}>
        <div className={classes.movieGridContainer}>
          {status === 'loading' ? (
            <p>Loading...</p>
          ) : (
            <>
              <CatalogList movies={movies} />
              <div>
                <button>Load more</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CatalogPage;

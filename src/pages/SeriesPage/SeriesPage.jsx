import React, { useEffect } from "react";
import classes from "../MoviesPage/MoviesPage.module.css";
import { CatalogList } from "../../components/Catalog/CatalogList/CatalogList";
import { fetchMovies, changeCurrentPage, setTotalPages, fetchTotalMoviePages } from "../../slice/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../../components/Pagination/Pagination.jsx";

export const SeriesPage = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const status = useSelector((state) => state.movies.status);
  const currentPage = useSelector((state) => state.movies.currentPage);
  const totalPages = useSelector((state) => state.movies.totalPages);

  useEffect(() => {
    dispatch(fetchMovies(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    fetchTotalMoviePages().then(res => {
      dispatch(setTotalPages(res));
    })
  }, [dispatch]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(changeCurrentPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
      dispatch(changeCurrentPage(currentPage + 1));
  };

  return (
    <>
      <div className={classes.catalogTitle}>
        <h2>Checkout the catalog of movies</h2>
      </div>
      <div className={classes.catalogContainer}>
        <div className={classes.movieGridContainer}>
          {status === "loading" ? (
            <p>Loading...</p>
          ) : (
            <>
              <CatalogList movies={movies} />
              <Pagination
                handlePrevPage={handlePrevPage}
                currentPage={currentPage}
                handleNextPage={handleNextPage}
                totalPages={totalPages}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SeriesPage;

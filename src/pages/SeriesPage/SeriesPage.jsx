import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "../MoviesPage/MoviesPage.module.css";
import { CatalogSerialList } from "../../components/Catalog/CatalogSerialList/CatalogSerialList.jsx";
import {
  fetchSerials,
  changeCurrentPage,
  setTotalPages,
  fetchTotalTVPages,
} from "../../slice/serialSlice.js";
import { Pagination } from "../../components/Pagination/Pagination.jsx";

export const SeriesPage = () => {
  const dispatch = useDispatch();
  const serials = useSelector((state) => state.serials.serials);
  const status = useSelector((state) => state.serials.status);
  const currentPage = useSelector((state) => state.serials.currentPage);
  const totalPages = useSelector((state) => state.serials.totalPages);

  useEffect(() => {
    dispatch(fetchSerials(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(fetchTotalTVPages()).then((res) => {
      dispatch(setTotalPages(res.payload));
    });
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
        <h2>Checkout the catalog of series</h2>
      </div>
      <div className={classes.catalogContainer}>
        <div className={classes.movieGridContainer}>
          {status === "loading" ? (
            <p>Loading...</p>
          ) : (
            <>
              <CatalogSerialList serials={serials} />
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

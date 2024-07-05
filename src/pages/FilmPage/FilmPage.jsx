import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails } from "../../slice/moviesSlice";
import classes from "./FilmPage.module.css";

export const FilmPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movieDetails = useSelector((state) => state.movies.movieDetails);
  const detailsStatus = useSelector((state) => state.movies.detailsStatus);

  const getGenreNames = (genres) => {
    return genres.map((genre) => genre.name).join(", ");
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id));
    }
  }, [dispatch, id]);

  if (detailsStatus === "loading") {
    return <p className={classes.loading}>Loading...</p>;
  }

  if (detailsStatus === "failed") {
    return <p className={classes.failed}>Failed to load movie details.</p>;
  }

  const releaseYear = movieDetails?.release_date
    ? movieDetails.release_date.split("-")[0]
    : "";
  console.log(movieDetails);
  return (
    <div>
      {movieDetails ? (
        <>
          <div
            className={classes.filmPoster}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
            }}
          >
            <div className={classes.cardContainer}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt={movieDetails.title}
                className={classes.cardImage}
              />
              <div className={classes.movieDetails}>
                <div className={classes.movieMainInfo}>
                  <h1 className={classes.movieTitle}>{movieDetails.title}</h1>
                  <h1 className={classes.MovieReleaseDate}>{releaseYear}</h1>
                  <h1 className={classes.MovieOriginCountry}>{movieDetails.origin_country}</h1>
                </div>
                <div className="здесь будет кругляшок ">
                  {movieDetails.vote_average}
                </div>
                <p>{movieDetails.overview}</p>
                <p className={classes.genre}>
                  {getGenreNames(movieDetails.genres || [])}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No movie details found.</p>
      )}
    </div>
  );
};

export default FilmPage;

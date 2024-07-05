import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails } from "../../slice/moviesSlice";
import { formatRating } from "../../util/CircularHelper";
import { UserScoreProgress } from "../../components/UserScoreProgress/UserScoreProgress";
import { ButtonToWatch } from "../../ui/Button/ButtonToWatch";
import classes from "./FilmPage.module.css";

export const FilmPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let userScore = null;
  let releaseYear = null;
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

  if (movieDetails) {
    userScore = formatRating(movieDetails.vote_average);
    releaseYear = movieDetails?.release_date ? movieDetails.release_date.split("-")[0] : "";
  }

  return (
    <div>
      {detailsStatus === 'loading' ? (
        <p>Loading...</p>
      ) : (
        movieDetails && (
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
                  </div>
                  <div className={classes.movieMainInfo}>
                    <h2 className={classes.MovieReleaseDate}>{movieDetails.runtime} min  / {releaseYear} ({movieDetails.origin_country})</h2>
                    <h2 ></h2>
                  </div>
                  <div className={classes.MovieActions}>
                    <UserScoreProgress userScore={userScore} />
                    <ButtonToWatch filmId={movieDetails.id} />
                  </div>
                  <div className={classes.movieOverview}>
                    <p>{movieDetails.overview}</p>
                  </div>
                  <div>
                    <ul className={classes.MovieGenreList}>
                      {(getGenreNames(movieDetails.genres || '').split(',').map((genre, index) => (
                        <li className={classes.MovieGenreItem} key={index}>{genre.trim()}</li>
                      )))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* <CastGrid cast={''}/> */}
          </>
        )
      )}
    </div>
  );
};

export default FilmPage;

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTvDetails } from "../../slice/serialSlice.js";
import { formatRating } from "../../util/CircularHelper";
import { UserScoreProgress } from "../../components/UserScoreProgress/UserScoreProgress";
import { ButtonToWatch } from "../../ui/Button/ButtonToWatch";
import classes from "../FilmPage/FilmPage.module.css";

export const SerialsDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let userScore = null;
  let releaseYear = null;
  const serialDetails = useSelector((state) => state.serials.serialDetails);
  const detailsStatus = useSelector((state) => state.serials.detailsStatus);

  const getGenreNames = (genres) => {
    return genres.map((genre) => genre.name).join(", ");
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchTvDetails(id));
    }
  }, [dispatch, id]);

  if (serialDetails) {
    userScore = formatRating(serialDetails.vote_average);
    releaseYear = serialDetails?.first_air_date
      ? serialDetails.first_air_date.split("-")[0]
      : "";
  }

  return (
    <div>
      {detailsStatus === "loading" ? (
        <p>Loading...</p>
      ) : (
        serialDetails && (
          <>
            <div
              className={classes.filmPoster}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${serialDetails.backdrop_path})`,
              }}
            >
              <div className={classes.cardContainer}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${serialDetails.poster_path}`}
                  alt={serialDetails.name}
                  className={classes.cardImage}
                />
                <div className={classes.movieDetails}>
                  <div className={classes.movieMainInfo}>
                    <h1 className={classes.movieTitle}>{serialDetails.name}</h1>{" "}
                  </div>
                  <div className={classes.movieMainInfo}>
                    <h2 className={classes.MovieReleaseDate}>
                      {`1 ep.  ${
                        serialDetails.episode_run_time?.[0] || ""
                      } min ||  `}
                      {`${releaseYear} (${
                        serialDetails.origin_country?.join(", ") || ""
                      })`}
                    </h2>

                    <h2></h2>
                  </div>
                  <div className={classes.MovieActions}>
                    <UserScoreProgress userScore={userScore} />
                    <ButtonToWatch filmId={serialDetails.id} />
                  </div>
                  <div className={classes.movieOverview}>
                    <p>{serialDetails.overview}</p>
                  </div>
                  <div>
                    <ul className={classes.MovieGenreList}>
                      {getGenreNames(serialDetails.genres || "")
                        .split(",")
                        .map((genre, index) => (
                          <li className={classes.MovieGenreItem} key={index}>
                            {genre.trim()}
                          </li>
                        ))}
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

export default SerialsDetailsPage;

import classes from "./CatalogList.module.css";
import { StarIcon } from '@chakra-ui/icons'
import { Link } from "react-router-dom";

export const CatalogList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <p>No movies available.</p>;
  }

  return (
    <div className={classes.movieGrid}>
      {movies.map((movie) => (
        <div key={movie.id} className={classes.movieCard}>
          <Link to={`/films/${movie.id}`}>
            <div className={classes.movieImgContainer}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={classes.movieImg}
              />
            </div>
            <div className={classes.movieInfo}>
              <div className={classes.movieMainInfo}>
                {movie.name !== undefined ? <h1>{movie.name}</h1> : <h1>{movie.title}</h1>}
                <p>{movie.release_date ? movie.release_date.split("-")[0] : "We don't know :("}</p>
              </div>
              {movie.vote_average.toFixed(1) > 0 && (
                <div className={classes.movieRating}>
                  <StarIcon />
                  <p>{movie.vote_average.toFixed(1)}</p>
                </div>
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

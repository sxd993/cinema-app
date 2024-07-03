import classes from "./CatalogList.module.css";
import { Link } from "react-router-dom";

export const CatalogList = ({ movies }) => {
  return (
    <>
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
                <p className={classes.movieRating}>
                  {movie.vote_average.toFixed(1)}
                </p>
              </div>
              <div className={classes.movieInfo}>
                {movie.name != undefined ? <h1>{movie.name}</h1> : <h1>{movie.title}</h1>}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

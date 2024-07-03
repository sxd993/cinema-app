import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./CatalogList.module.css";
import { Link } from "react-router-dom";

export const CatalogList = ({ movies }) => {
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
              <p className={classes.movieRating}>
                {Math.round(movie.vote_average * 10) / 10}
              </p>
            </div>
            <div className={classes.movieInfo}>
              <h1>{movie.title}</h1>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

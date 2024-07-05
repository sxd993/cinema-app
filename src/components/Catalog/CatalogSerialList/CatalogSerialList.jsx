import React from "react";
import classes from "../CatalogList/CatalogList.module.css";
import { StarIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export const CatalogSerialList = ({ serials }) => {
  if (!serials || serials.length === 0) {
    return <p>No series available.</p>;
  }

  return (
    <div className={classes.movieGrid}>
      {serials.map((serial) => (
        <div key={serial.id} className={classes.movieCard}>
          <Link to={`/series/${serial.id}`}>
            <div className={classes.movieImgContainer}>
              <img
                src={`https://image.tmdb.org/t/p/w500${serial.poster_path}`}
                alt={serial.name}
                className={classes.movieImg}
              />
            </div>
            <div className={classes.movieInfo}>
              <div className={classes.movieMainInfo}>
                <h1>{serial.name}</h1>
                <p>
                  Release Date:{" "}
                  {serial.first_air_date
                    ? serial.first_air_date.split("-")[0]
                    : "No date"}
                </p>
              </div>
              {serial.vote_average && serial.vote_average.toFixed(1) > 0 && (
                <div className={classes.movieRating}>
                  <StarIcon />
                  <p>{serial.vote_average.toFixed(1)}</p>
                </div>
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CatalogSerialList;

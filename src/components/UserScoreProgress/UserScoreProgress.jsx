import React from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { colorTransform } from "../../util/CircularHelper";
import classes from "../../pages/FilmPage/FilmPage.module.css";

export const UserScoreProgress = ({ userScore }) => {
  return (
    <div className={classes.movieUserScore}>
      <CircularProgress className={classes.CircularProgressLabel} thickness={5} value={userScore} size={50} color={colorTransform(userScore)}>
        <CircularProgressLabel className={classes.CircularProgressLabel}>
          <p>
            {userScore > 0 ? (userScore / 10) : ""}
          </p>
        </CircularProgressLabel>
      </CircularProgress>
      <h3>User score</h3>
    </div >
  );
};

import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./button.module.css";
import { fetchTrailerId } from "../../slice/moviesSlice";
import { fetchTvTrailerId } from "../../slice/serialSlice";

export const ButtonToWatch = ({ filmId }) => {
  const dispatch = useDispatch();
  const trailerId = useSelector((state) => state.movies.trailerId);
  const tvTrailerId = useSelector((state) => state.serials.trailerId);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        await dispatch(fetchTrailerId(filmId)).unwrap();
      } catch (error) {
        await dispatch(fetchTvTrailerId(filmId)).unwrap();
      }
    };

    fetchTrailer();
  }, [dispatch, filmId]);

  let watchTrailerUrl = trailerId
    ? `https://www.youtube.com/watch?v=${trailerId}`
    : `https://www.youtube.com/watch?v=${tvTrailerId}`;

  return (
    <a
      className={classes.link}
      href={watchTrailerUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ExternalLinkIcon />
      <p>Watch Trailer</p>
    </a>
  );
};

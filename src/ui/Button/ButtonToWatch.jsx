import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './button.module.css';
import { fetchTrailerId } from '../../slice/moviesSlice';

export const ButtonToWatch = ({ filmId }) => {
    const dispatch = useDispatch();
    const trailerId = useSelector(state => state.movies.trailerId);

    useEffect(() => {
        dispatch(fetchTrailerId(filmId));
    }, [dispatch, filmId]);

    let watchTrailerUrl = `https://www.youtube.com/watch?v=${trailerId}`;

    return (
        <a className={classes.link} href={watchTrailerUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLinkIcon />
            <p>Watch Trailer</p>
        </a>
    );
};

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails } from '../../slice/moviesSlice';
import classes from './FilmPage.module.css';

export const FilmPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const movieDetails = useSelector((state) => state.movies.movieDetails);
    const detailsStatus = useSelector((state) => state.movies.detailsStatus);

    useEffect(() => {
        dispatch(fetchMovieDetails(id));
    }, [dispatch, id]);

    if (detailsStatus === 'loading') {
        return <p>Loading...</p>;
    }

    if (detailsStatus === 'failed') {
        return <p>Failed to load movie details.</p>;
    }

    return (
        <>
        <div className={classes.filmPage}>
            {movieDetails ? (
                <>
                    <h1>{movieDetails.title}</h1>
                    <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} />
                    <p>{movieDetails.overview}</p>
                    <p>Release Date: {movieDetails.release_date}</p>
                    <p>Rating: {Math.round(movieDetails.vote_average * 10) / 10}</p>
                </>
            ) : (
                <p>No movie details found.</p>
            )}
        </div>
        </>
    );
};

export default FilmPage;

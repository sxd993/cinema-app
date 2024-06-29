import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenres } from '../../../slice/moviesSlice.js';  // Импортируйте созданный выше slice
import classes from './CatalogList.module.css';
import { Link } from 'react-router-dom';

export const CatalogList = ({ movies }) => {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.movies.genres);

    useEffect(() => {
        dispatch(fetchGenres());
    }, [dispatch]);

    const getGenreNames = (genreIds) => {
        return genreIds.map(id => {
            const genre = genres.find(g => g.id === id);
            return genre ? genre.name : 'Unknown';
        }).join(', ');
    };

    return (
        <div className={classes.movieGrid}>
            {movies.map(movie => (
                <div key={movie.id} className={classes.movieCard}>
                    <div className={classes.movieImgContainer}>
                        <p>{Math.round(movie.vote_average * 10) / 10}</p>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className={classes.movieImg} />
                    </div>
                    <div className={classes.movieInfo}>
                        <h1>{movie.title}</h1>
                        <h3>{movie.overview}</h3>
                        <h4>{getGenreNames(movie.genre_ids)}</h4>
                        <p>Release Date: {movie.release_date}</p>
                    </div>
                    <div className={classes.flexContainer}>
                        <Link to={`/films/${movie.id}`}>More info</Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

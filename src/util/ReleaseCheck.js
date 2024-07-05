export const CheckReleasedMovies = (movies) => {
    return movies.filter(movie => {
        return movie.release_date && new Date(movie.release_date) <= new Date();
    });
}

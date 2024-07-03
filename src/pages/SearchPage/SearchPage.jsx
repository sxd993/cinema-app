import classes from './SearchPage.module.css'

export const SearchPage = () => {
    return (
        <>
            <div className={classes.searchBar}>
                <label htmlFor="searchFilm"></label>
                <input type="search" id='searchFilm' placeholder='Search' />
            </div>
        </>
    )
}
export default SearchPage;
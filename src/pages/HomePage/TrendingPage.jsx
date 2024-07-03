import { useEffect } from "react";
import classes from './HomePage.module.css'
import { fetchTrending } from "../../slice/moviesSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { CatalogList } from "../../components/Catalog/CatalogList/CatalogList.jsx";
import { setTrendingMovies } from "../../slice/moviesSlice.js";
import Footer from "../../components/Footer/Footer.jsx";
import { Sort } from "../../components/Sort/Sort.jsx";

export const TrendingPage = () => {

    const dispatch = useDispatch();
    const trending = useSelector((state) => state.movies.trendingMovies);
    const timeWindow = useSelector((state) => state.movies.timeWindow);

    useEffect(() => {
        fetchTrending(timeWindow).then(res => {
            {
                dispatch(setTrendingMovies(res.results));
            }
        }).catch(err => {
        }); 
    }, [dispatch, timeWindow]);
    return (
        <>
            <div className={classes.container}>
                <h1>Trending Right Now</h1>
            </div>
            {trending.length === 0
                ?
                <div className={classes.loading}>
                    <p>Loading...</p>
                </div>
                :
                <>
                    <Sort />
                    <CatalogList movies={trending} />
                    <Footer />
                </>
            }

        </>
    )
}

export default TrendingPage;
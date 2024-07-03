import { useDispatch, useSelector } from "react-redux";
import { setTimeWindow } from '../../slice/moviesSlice';

import classes from "./Sort.module.css";

export const Sort = () => {
    const dispatch = useDispatch();
    const timeWindow = useSelector((state) => state.movies.timeWindow);
    const handleTimeWindowChange = (window) => {
        dispatch(setTimeWindow(window));
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.sort_by}>Sort by</h1>
            <div className={classes.sort_container}>
                <button className={timeWindow === 'day' ? classes.active : classes} onClick={() => handleTimeWindowChange('day')}>Today</button>
                <button className={timeWindow === 'week' ? classes.active : classes} onClick={() => handleTimeWindowChange('week')}>This Week</button>
            </div>
        </div>
    );
};

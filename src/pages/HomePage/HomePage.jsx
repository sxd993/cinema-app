import Header from '../../components/Header/Header'
import classes from './HomePage.module.css'
import { Outlet } from 'react-router-dom'

export const HomePage = () => {
    return (
        <>
            <Header />
            <div className={classes.container}>
                <Outlet />
            </div>
        </>
    )
}

export default HomePage;
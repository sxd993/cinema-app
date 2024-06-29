import Header from '../components/Header/Header'
import { Outlet } from'react-router-dom'

export const HomePage = () => {
    return (
        <>
            <Header />
            <Outlet/>
        </>
    )
}

export default HomePage;
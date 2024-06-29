import classes from "./Header.module.css"
import logo from "../../img/logo.png"
import userLogo from '../../img/Sample_User_Icon.png'
import burgerButton from '../../img/burger-menu-svgrepo-com.svg'
import { Link, Outlet } from'react-router-dom'

export const Header = () => {
    return (
        <>
        <header className={classes.header}>
            <Link className={classes.header__logo} to={'/'}>
                <img src={logo} alt="hello" />
            </Link>
            <nav className={classes.header__nav}>
                <Link to='/'>Home</Link>
                <Link to='/catalog'>Catalog</Link>
                <Link to='/about-us'>About us</Link>
                <Link to='/support'>Support</Link>
            </nav>
            <nav className={classes.header__nav_burger_button}>
                <img src={burgerButton} alt="" width={50} height={50} />
            </nav>
        </header>
        </>
    )
}

export default Header;
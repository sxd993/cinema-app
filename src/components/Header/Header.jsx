import classes from "./Header.module.css"
import burgerButton from '../../img/burger-menu-svgrepo-com.svg'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <>
            <header className={classes.header}>
                <Link className={classes.header__logo} to={'/'}>
                    <h1 className={classes.logo_text}>NET F LIX</h1>
                </Link>
                <nav className={classes.header__nav}>
                    <Link to='/'>Home</Link>
                    <Link to='/movies'>Movies</Link>
                    <Link to='/tv-series'>TV Series</Link>
                    <Link to='/search'>Search</Link>
                </nav>
                <nav className={classes.header__nav_burger_button}>
                    <img src={burgerButton} alt="" width={50} height={50} />
                </nav>
            </header>
        </>
    )
}

export default Header;
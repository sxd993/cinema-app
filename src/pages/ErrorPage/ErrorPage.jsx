
import classes from './ErrorPage.module.css';
import Header from '../../components/Header/Header';

export const ErrorPage = () => {
    return (
        <>
            <Header />
            <div className={classes.error_page}>
                <h1>Oops! Something went wrong.</h1>
                <p>Please try again later or contact support.</p>
                {/* Add any additional elements or styles as needed */}
            </div>
        </>
    );
};

export default ErrorPage;
import './ErrorPage.css';
import errorPage from './../../assets/img/icons/error.png';

const ErrorPage = () => {
    return (
        <main className="errorPage">
            <img className="errorPage__image" src={errorPage} alt="error page" />
        </main>
    );
};

export default ErrorPage;

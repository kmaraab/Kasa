import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.scss';

function ErrorPage() {
  return (
    <>
      <div
        className={`d-flex flex-column justify-content-center align-items-center ${styles.contentContainer}`}
      >
        <h2 className={styles.errorType}>404</h2>
        <p className={styles.errorMessage}>
          Oups! La page que vous demandez n'existe pas.
        </p>
        <Link className={styles.backToHome} to="/">
          Retourner sur la page d’accueil
        </Link>
      </div>
    </>
  );
}

export default ErrorPage;

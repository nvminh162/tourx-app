import clsx from 'clsx';
import styles from './Home.module.scss';

function Home() {
    const classes = clsx(styles.wrapper);

    return (
        <div className={classes}>
            <h1 class="text-5xl font-bold flex justify-center text-red-800">Home page</h1>
        </div>
    );
}

export default Home;

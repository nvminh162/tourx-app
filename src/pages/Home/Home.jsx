import clsx from "clsx";
import styles from './Home.module.scss'

function Home() {
    const classes = clsx(styles.wrapper)

    return (
        <div className={classes}>
            Home page
        </div>
    );
}

export default Home;

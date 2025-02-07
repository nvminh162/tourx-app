import clsx from "clsx";
import styles from './Search.module.scss'

function Search() {
    const classes = clsx(styles.wrapper)

    return (
        <div className={classes}>
            Search page
        </div>
    );
}

export default Search;

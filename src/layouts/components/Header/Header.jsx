import clsx from 'clsx';
import styles from './Header.module.scss';

function Header() {
    const classes = clsx('header', styles.wrapper);

    return <div className={classes}>Header layout</div>;
}

export default Header;

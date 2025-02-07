import clsx from 'clsx';
import styles from './Sidebar.module.scss';

function Sidebar() {
    const classes = clsx('sidebar', styles.wrapper);

    return <div className={classes}>Sidebar layout</div>;
}

export default Sidebar;
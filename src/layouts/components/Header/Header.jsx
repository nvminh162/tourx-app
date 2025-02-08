import clsx from 'clsx';

import styles from './Header.module.scss';
import Button from '~/components/Button';
import config from '~/config';

function Header() {
    const classes = clsx('header', styles.wrapper);

    return (
        <div className={classes}>
            <span>Header layout</span>
            <div>
                <Button primary to={config.routes.home}>Home</Button>
                <Button to={config.routes.login}>Login</Button>
                <Button outline to={config.routes.search}>Search</Button>
            </div>
        </div>
    );
}

export default Header;

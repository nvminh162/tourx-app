import clsx from "clsx";
import styles from './Login.module.scss'

function Login() {
    const classes = clsx(styles.wrapper)

    return (
        <div className={classes}>
            Login page
        </div>
    );
}

export default Login;

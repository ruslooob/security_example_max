import React from 'react'
import {makeStyles, Theme} from "@material-ui/core/styles";
import {AppBar, Box, Button, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {isUserLoggedIn} from "../../store";
import {logOut} from "../../store/slice/AuthSlice";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        //backgroundColor: deepOrange["900"]// '#d04516'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "space-between",
        textDecoration: 'none'
    },
    button: {
        color: "white",
    }
}));


export const Header = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(isUserLoggedIn);

    const authButtons = (
        <>
            <Link to={"/login"} style={{color: 'inherit', textDecoration: 'inherit'}}>
                <Button
                    className={classes.button}
                    color="primary"
                >
                    Войти
                </Button>
            </Link>
            <Link to="/register" style={{color: 'inherit', textDecoration: 'inherit'}}>
                <Button
                    className={classes.button}
                    color="primary"
                >
                    Зарегистрироваться
                </Button>
            </Link>
        </>
    )

    const handleLogoutClick = () => {
        dispatch(logOut())
    }

    const logoutButton = (
        <Link to="/">
            <Button
                className={classes.button}
                color="primary"
                onClick={handleLogoutClick}
            >
                Выйти
            </Button>
        </Link>
    )

    return (
        <AppBar className={classes.root} position="relative">
            <Toolbar className={classes.toolbar}>
                <Link to="/" style={{color: 'inherit', textDecoration: 'inherit'}}>
                    <Typography variant="h6">Медсофт</Typography>
                </Link>
                <Box>
                    {isLoggedIn ? logoutButton : authButtons}
                </Box>
            </Toolbar>
        </AppBar>
    )
}
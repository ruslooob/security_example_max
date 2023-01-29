import React from 'react'
import {makeStyles, Theme} from "@material-ui/core/styles";
import {AppBar, Box, Button, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

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

    return (
        <AppBar className={classes.root} position="relative">
            <Toolbar className={classes.toolbar}>
                <Link to="/" style={{color: 'inherit', textDecoration: 'inherit'}}>
                    <Typography variant="h6">Медсофт</Typography>
                </Link>
                <Box>
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
                </Box>
            </Toolbar>
        </AppBar>
    )
}
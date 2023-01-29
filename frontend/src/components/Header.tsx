import React from 'react'
import {makeStyles, Theme} from "@material-ui/core/styles";
import {AppBar, Box, Button, Toolbar, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {DialogActionType, DialogType} from "../redux/reducer/DialogReducer";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        //backgroundColor: deepOrange["900"]// '#d04516'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    button: {
        color: "white",
    }
}));

export const Header = () => {
    const classes = useStyles()
    const dispatch = useDispatch();

    const handleLoginClick = () => {
        dispatch({
            type: DialogActionType.OPEN_DIALOG,
            payload: {
                dialogType: DialogType.LOGIN
            }
        });
    };

    const handleRegisterClick = () => {
        dispatch({
            type: DialogActionType.OPEN_DIALOG,
            payload: {
                dialogType: DialogType.REGISTER
            }
        });
    }

    return (
        // todo узнать, как не дублировать имена классов, а присвоить стили по типу Тэга
        <AppBar className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6">Медсофт</Typography>
                <Box>
                    <Button
                        className={classes.button}
                        color="primary"
                        onClick={handleLoginClick}
                    >
                        Войти
                    </Button>
                    <Button
                        className={classes.button}
                        color="primary"
                        onClick={handleRegisterClick}
                    >
                        Зарегистрироваться
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {PasswordField} from "./PasswordField";
import {Box, Paper, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {useStyles} from "./FormStyles";
import {doLogin} from "../../store/slice/AuthSlice";

/*todo подумать над созданием отдельных компонентов для полей ввода*/
/*todo add validation after extraction fields into separate components*/
export const LoginForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(doLogin({login, password}))
    };

    return (
        <Paper className={classes.root}>
            <Typography variant="h5">Вход</Typography>
            <Box className={classes.form} component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                <TextField
                    id="login"
                    label="Логин"
                    value={login}
                    fullWidth
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLogin(event.target.value)}
                />
                <PasswordField id="password" label="Пароль" onChange={setPassword}/>
                <Button
                    className={classes.submitBtn}
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                >
                    Войти
                </Button>
            </Box>
        </Paper>
    );
};

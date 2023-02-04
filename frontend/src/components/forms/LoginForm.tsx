import React, {FormEvent, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {PasswordField} from "./PasswordField";
import {Box, Paper, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {useStyles} from "./FormStyles";
import {setCredentials, User} from "../../store/slice/AuthSlice";
import {useLoginMutation} from "../../api/apiSlice";
import {useNavigate} from "react-router-dom";

/*todo подумать над созданием отдельных компонентов для полей ввода*/
/*todo add validation after extraction fields into separate components*/
export const LoginForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [doLogin, {isLoading, isError}] = useLoginMutation();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await doLogin({login, password} as User).unwrap()
            const user: User = {login, password}
            const token = response.token
            dispatch(setCredentials({user, token}))
            if (token) {
                navigate("/main")
            } else {
                console.log("incorrect login or password")
            }
        } catch (err) {
            console.error("error while access to api")
        }
    };

    return (
        <Paper className={classes.root}>
            <Typography variant="h5">Вход</Typography>
            <Box className={classes.form}
                 component="form"
                 onSubmit={handleSubmit} sx={{mt: 1}}
            >
                <TextField
                    id="login"
                    label="Логин"
                    value={login}
                    fullWidth
                    onChange={e => setLogin(e.target.value)}
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

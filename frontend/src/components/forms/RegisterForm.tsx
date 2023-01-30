import React from 'react'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {PasswordField} from "./PasswordField";
import {Box, Paper, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {useStyles} from "./FormStyles";
import {doRegister} from "../../store/slice/AuthSlice";


export const RegisterForm = () => {
    const classes = useStyles()
    const dispatch = useDispatch();

    const [fio, setFio] = React.useState('');
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(doRegister({fio, login, password, repeatPassword}))
    }

    return (
        <Paper className={classes.root}>
            <Typography variant="h5">Регистрация</Typography>
            <Box className={classes.form} component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                <TextField
                    id="lastName"
                    label="Фамилия"
                    value={fio}
                    fullWidth
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFio(event.target.value)}
                />
                <TextField
                    id="firstName"
                    label="Имя"
                    value={fio}
                    fullWidth
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFio(event.target.value)}
                />
                <TextField
                    id="middleName"
                    label="Отчество"
                    value={fio}
                    fullWidth
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFio(event.target.value)}
                />
                <TextField
                    id="login"
                    label="Логин"
                    value={login}
                    fullWidth
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLogin(event.target.value)}
                />
                <PasswordField id="password" label="Пароль" onChange={setPassword}/>
                <PasswordField id="repeatPassword" label="Пароль еще раз" onChange={setRepeatPassword}/>
                <Button
                    className={classes.submitBtn}
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                >
                    Зарегистрироваться
                </Button>
            </Box>
        </Paper>

    )
}
import React, {FormEvent, useState} from 'react'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {PasswordField} from "./PasswordField";
import {Box, Paper, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {useStyles} from "./FormStyles";
import {useRegisterMutation} from "../../api/apiSlice";
import {useNavigate} from "react-router-dom";
import {setCredentials, User} from "../../store/slice/AuthSlice";


export const RegisterForm = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [doRegister, {isLoading, isError}] = useRegisterMutation();

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    // todo add validation for repeat password
    const [repeatPassword, setRepeatPassword] = useState('');


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userData = await doRegister({firstName, lastName, middleName, login, password}).unwrap()
        const user: User = {login, password}
        const token = userData.token;
        dispatch(setCredentials({user, token}))
        if (token) {
            navigate("/login")
        } else {
            console.log("incorrect login or password")
        }
    }

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setLastName(event.target.value);
    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value);
    const handleMiddleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setMiddleName(event.target.value);
    const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => setLogin(event.target.value);
    return (
        <Paper className={classes.root}>
            <Typography variant="h5">Регистрация</Typography>
            <Box className={classes.form} component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                <TextField
                    id="lastName"
                    label="Фамилия"
                    value={lastName}
                    fullWidth
                    onChange={handleLastNameChange}
                />
                <TextField
                    id="firstName"
                    label="Имя"
                    value={firstName}
                    fullWidth
                    onChange={handleFirstNameChange}
                />
                <TextField
                    id="middleName"
                    label="Отчество"
                    value={middleName}
                    fullWidth
                    onChange={handleMiddleNameChange}
                />
                <TextField
                    id="login"
                    label="Логин"
                    value={login}
                    fullWidth
                    onChange={handleLoginChange}
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
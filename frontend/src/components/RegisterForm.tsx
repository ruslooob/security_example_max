import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {PasswordField} from "./PasswordField";
import store from "../redux/store";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
        width: '25ch',
    },
    submitBtn: {
        marginTop: 10
    }
}));

interface Props {
    onSubmit: (
        fio: string,
        login: string,
        password: string,
        repeatPassword: string,
    ) => void
}

export const RegisterForm: React.FC<Props> = ({onSubmit}) => {
    const classes = useStyles()

    const [fio, setFio] = React.useState('');
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit(fio, login, password, repeatPassword)
        console.log(store.getState())
    }

    return (
        <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
            <TextField
                id="fio"
                label="ФИО"
                value={fio}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFio(event.target.value)}
            />
            <TextField
                id="login"
                label="Логин"
                value={login}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLogin(event.target.value)}
            />
            <PasswordField id="password" label="Пароль" onChange={setPassword}/>
            <PasswordField id="repeatPassword" label="Пароль еще раз" onChange={setRepeatPassword}/>
            <Button
                className={classes.submitBtn}
                variant="contained"
                color="primary"
                type="submit">
                Зарегистрироваться
            </Button>
        </form>
    )
}
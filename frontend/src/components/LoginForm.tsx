import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {PasswordField} from "./PasswordField";

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
    onSubmit: (login: string, password: string) => void;
}

export const LoginForm: React.FC<Props> = ({onSubmit}) => {
    const classes = useStyles();
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(login, password);
    };

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
                id="login"
                label="Логин"
                value={login}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLogin(event.target.value)}
            />
            <PasswordField id="password" label="Пароль" onChange={setPassword}/>
            <Button
                className={classes.submitBtn}
                variant="contained"
                color="primary"
                type="submit"
            >
                Войти
            </Button>
        </form>
    );
};

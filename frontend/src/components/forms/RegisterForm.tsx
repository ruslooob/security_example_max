import React, {useState} from 'react'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {PasswordField} from "./PasswordField";
import {Box, IconButton, Paper, Snackbar, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {useStyles} from "./FormStyles";
import {useRegisterMutation} from "../../api/authApi";
import {useNavigate} from "react-router-dom";
import {z} from 'zod'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema} from "./authSchema";
import CloseIcon from '@mui/icons-material/Close';
import {delay} from "../../utils/delay";


export const RegisterForm = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSnackBarShowing, setSnackBarShowing] = useState(false);

    const [doRegister, {isLoading, isError}] = useRegisterMutation();

    const handleSnackBarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarShowing(false);
    };

    const snackBarAction = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackBarClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );

    const snackBarShowingTimeMillis = 2_000
    const onSubmit: SubmitHandler<RegisterInputType> = async (data) => {
        setSnackBarShowing(true)
        await delay(snackBarShowingTimeMillis)

        const userData = await doRegister(data).unwrap()
        const token = userData.token;
        if (token) {
            navigate("/login")

        } else {
            console.log("incorrect login or password")
        }
    }

    type RegisterInputType = z.infer<typeof registerSchema>;
    const {
        control,
        watch,
        handleSubmit,
        formState: {errors}
    } = useForm<RegisterInputType>({
        mode: "onChange",
        resolver: zodResolver(registerSchema),
    })

    return (
        <Paper className={classes.root}>
            <Snackbar
                open={isSnackBarShowing}
                autoHideDuration={snackBarShowingTimeMillis}
                onClose={handleSnackBarClose}
                message="Пользователь успешно зарегистрирован"
                action={snackBarAction}
            />
            <Typography variant="h5">Регистрация</Typography>
            <Box className={classes.form} component="form" onSubmit={handleSubmit(onSubmit)} sx={{mt: 1}}>
                <Controller
                    name="lastName"
                    control={control}
                    defaultValue=''
                    render={({field: {ref, ...field}}) => (
                        <TextField
                            label="Фамилия"
                            fullWidth
                            error={Boolean(errors.lastName)}
                            helperText={errors.lastName?.message}
                            inputRef={ref}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="firstName"
                    control={control}
                    defaultValue=''
                    render={({field: {ref, ...field}}) => (
                        <TextField
                            label="Имя"
                            fullWidth
                            error={Boolean(errors.firstName)}
                            helperText={errors.firstName?.message}
                            inputRef={ref}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="middleName"
                    control={control}
                    defaultValue=''
                    render={({field: {ref, ...field}}) => (
                        <TextField
                            label="Отчество"
                            fullWidth
                            error={Boolean(errors.middleName)}
                            helperText={errors.middleName?.message}
                            inputRef={ref}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="login"
                    control={control}
                    defaultValue=''
                    render={({field: {ref, ...field}}) => (
                        <TextField
                            label="Логин"
                            fullWidth
                            error={Boolean(errors.login)}
                            helperText={errors.login?.message}
                            inputRef={ref}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    defaultValue=''
                    render={({field: {ref, ...field}}) => (
                        <PasswordField
                            label="Пароль"
                            error={Boolean(errors.password)}
                            helperText={errors.password?.message}
                            inputRef={ref}
                            field={field}
                        />
                    )}
                />
                <Controller
                    name="repeatPassword"
                    control={control}
                    defaultValue=''
                    render={({field: {ref, ...field}}) => (
                        <PasswordField
                            label="Пароль еще раз"
                            error={Boolean(errors.repeatPassword)}
                            helperText={errors.repeatPassword?.message}
                            inputRef={ref}
                            field={field}
                        />
                    )}
                />
                {/*<pre>{JSON.stringify(watch(), null, 2)}</pre>*/}
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
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Box, Paper, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {useStyles} from "./FormStyles";
import {Credentials, LoginPayload, setCredentials} from "../../store/slice/AuthSlice";
import {useLoginMutation} from "../../api/authApi";
import {useNavigate} from "react-router-dom";
import {z} from "zod";
import {loginSchema} from "./authSchema";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod/dist/zod";
import {PasswordField} from "./PasswordField";
import {Alert} from "@mui/material";

/*todo подумать над созданием отдельных компонентов для полей ввода*/
export const LoginForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [doLogin, {isLoading, isError}] = useLoginMutation();


    const onSubmit: SubmitHandler<LoginInputType> = async (data) => {
        try {
            console.log(data)
            const response = await doLogin({...data} as LoginPayload).unwrap()
            const token = response.token;
            const role = response.role;
            dispatch(setCredentials({...data, token, role} as Credentials))
            if (token) {
                navigate("/main")
            } else {
                console.log("incorrect login or password")
            }
        } catch (err) {
            console.error("error while access to api")
        }
    };


    type LoginInputType = z.infer<typeof loginSchema>;
    const {
        control,
        watch,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginInputType>({
        mode: "onChange",
        resolver: zodResolver(loginSchema),
    })

    return (
        <Paper className={classes.root}>
            <Typography variant="h5">Вход</Typography>
            <Box className={classes.form}
                 component="form"
                 onSubmit={handleSubmit(onSubmit)} sx={{mt: 1}}
            >
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

import {Dialog, DialogContent, DialogTitle, Paper} from "@material-ui/core";
import {LoginForm} from "./LoginForm";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {DialogType} from "../redux/reducer/DialogReducer";
import {AuthAction, loginAC} from "../redux/reducer/AuthReducer";


interface Props {
    handleClose: React.Dispatch<AuthAction>;
}

export function LoginDialog({handleClose}: Props) {
    const dispatch = useDispatch();
    const openedDialogName = useSelector((state: any) => state.openedDialogName)
    const isLoginDialogOpened = openedDialogName === DialogType.LOGIN

    const handleLoginSubmit = (login: string, password: string) => {
        dispatch(loginAC({login, password}))
    };

    return (
        <Dialog
            open={isLoginDialogOpened}
            onClose={handleClose}
        >
            <Paper style={{padding: 20}}>
                <DialogTitle>Вход</DialogTitle>
                <DialogContent>
                    <LoginForm onSubmit={handleLoginSubmit}/>
                </DialogContent>
            </Paper>
        </Dialog>
    )
}
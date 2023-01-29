import {Dialog, DialogContent, DialogTitle, Paper} from "@material-ui/core";
import {RegisterForm} from "./RegisterForm";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {DialogAction, DialogType} from "../redux/reducer/DialogReducer";
import {registerAC} from "../redux/reducer/AuthReducer";


interface Props {
    handleClose: React.Dispatch<DialogAction>;
}

export function RegisterDialog({handleClose}: Props) {
    const dispatch = useDispatch();
    const openedDialogName = useSelector((state: any) => state.openedDialogName)
    const isRegisterDialogOpened = openedDialogName === DialogType.REGISTER

    const handleRegisterSubmit = (fio: string, login: string, password: string, repeatPassword: string) => {
        dispatch(registerAC({fio, login, password, repeatPassword}))
    }

    return (
        <Dialog
            open={isRegisterDialogOpened}
            onClose={handleClose}
        >
            {/* todo попробовать сделать обертку - DialogWrapper*/}
            <Paper style={{padding: 20}}>
                <DialogTitle>Регистрация</DialogTitle>
                <DialogContent>
                    <RegisterForm onSubmit={handleRegisterSubmit}/>
                </DialogContent>
            </Paper>
        </Dialog>
    )
}
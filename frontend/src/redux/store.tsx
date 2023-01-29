import {AuthActionType, authReducer} from "./reducer/AuthReducer";
import {DialogActionType, dialogReducer} from "./reducer/DialogReducer";
import {configureStore} from "@reduxjs/toolkit";

/*todo перевести все на redux-toolkit*/
export interface State {
    fio: string,
    login: string,
    password: string,
    repeatPassword: string,

    openedDialogName: DialogActionType,
}

/*todo убрать лишние переменные*/
const initialState: State = {
    fio: '',
    login: '',
    password: '',
    repeatPassword: '',

    // показывать ли на главной странице страницу входа
    openedDialogName: DialogActionType.NO_DIALOG,
}

function rootReducer(state: State = initialState, action: any) {
    switch (action.type) {
        // todo потом как-нибудь попробовать объединить это в один enum
        case AuthActionType.REGISTER:
        case AuthActionType.LOGIN: {
            return authReducer(state, action)
        }
        case DialogActionType.OPEN_DIALOG:
        case DialogActionType.CLOSE_DIALOG: {
            return dialogReducer(state, action)
        }
        default:
            return state;
    }
}


const store = configureStore({
    reducer: rootReducer,
    devTools: true
});

export default store;
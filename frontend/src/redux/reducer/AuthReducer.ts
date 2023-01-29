import {State} from "../store";

export interface AuthAction {
    type: AuthActionType,
    payload: LoginPayload | RegisterPayload,
}

export enum AuthActionType {
    LOGIN = "LOGIN",
    REGISTER = "REGISTER",
}

export interface LoginPayload {
    login: string,
    password: string
}

export interface RegisterPayload {
    fio: string,
    login: string,
    password: string,
    repeatPassword: string
}

export function authReducer(state: State, action: AuthAction): State {
    const payload: any = action.payload;
    switch (action.type) {
        case AuthActionType.LOGIN: {
            let login = payload.login
            let password = payload.password
            return {
                ...state,
                login,
                password,
                // todo дописать логику входа
            }
        }
        case AuthActionType.REGISTER: {
            let fio = payload.fio
            let login = payload.login
            let password = payload.password
            let repeatPassword = payload.repeatPassword
            return {
                ...state,
                fio,
                login,
                password,
                repeatPassword
            }
        }
        default:
            return state
    }
}

export function loginAC(loginPayload: LoginPayload) {
    return {
        type: AuthActionType.LOGIN,
        payload: {
            ...loginPayload
        }
    }
}

export function registerAC(registerPayload: RegisterPayload) {
    return {
        type: AuthActionType.REGISTER,
        payload: {
            ...registerPayload
        }
    }
}
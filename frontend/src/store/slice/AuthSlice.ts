import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface PersonInfo {
    firstName: string,
    lastName: string,
    middleName: string,
}

export interface AuthState {
    login: string,
    password: string,
    personInfo?: PersonInfo,
    token: string,
}

export interface LoginPayload {
    login: string,
    password: string
}


export interface RegisterPayload {
    firstName: string,
    lastName: string,
    middleName: string | null,
    login: string,
    password: string,
}

export interface Credentials {
    login: string,
    password: string
    token: string,
}

const initialState: AuthState = {
    login: '',
    password: '',
    personInfo: {} as PersonInfo,
    token: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // todo найти способ, как более лаконично сделать присвоение по короткому пока не получается
        setCredentials(state: AuthState, action: PayloadAction<Credentials>) {
            const payload = action.payload
            state.login = payload.login
            state.password = payload.password
            state.token = payload.token
        },
        logOut(state: AuthState) {
            state.login = ''
            state.password = ''
            state.personInfo = {} as PersonInfo
            state.token = ''
        }
    }
})

export const {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer;

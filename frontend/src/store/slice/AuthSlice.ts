import {createSlice} from "@reduxjs/toolkit";

export interface AuthState {
    firstName: string,
    lastName: string,
    middleName: string,
    login: string,
    password: string,
}

export interface LoginPayload {
    login: string,
    password: string
}

export interface RegisterPayload {
    firstName: string,
    lastName: string,
    middleName: string,
    login: string,
    password: string,
}

const initialState: AuthState = {
    firstName: '',
    lastName: '',
    middleName: '',
    login: '',
    password: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        doLogin(state, action) {
            const payload: LoginPayload = action.payload;
            state.login = payload.login;
            state.password = payload.password;
        },
        doRegister(state, action) {
            const payload: RegisterPayload = action.payload;
            state.firstName = payload.firstName;
            state.lastName = payload.lastName;
            state.middleName = payload.middleName;
            state.login = payload.login;
            state.password = payload.password;
        }
    }
})

export const {doLogin, doRegister} = authSlice.actions;

export default authSlice.reducer;

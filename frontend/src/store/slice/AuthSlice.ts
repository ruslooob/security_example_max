import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface User {
    login: string,
    password: string,
}

export interface PersonInfo {
    firstName: string,
    lastName: string,
    middleName: string,
}

export interface AuthState {
    user: User | null,
    personInfo: PersonInfo | null
    token: string | null,
}

export interface LoginPayload {
    login: string,
    password: string
}

/*todo убрать хранение пароля на клиенте*/
export interface RegisterPayload {
    firstName: string,
    lastName: string,
    middleName: string,
    login: string,
    password: string,
}

export interface Credentials {
    user: User,
    token: string,
}

const initialState: AuthState = {
    user: null,
    personInfo: null,
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state: AuthState, action: PayloadAction<Credentials>) {
            const {user, token} = action.payload
            state.user = user;
            state.token = token;
        },
        logOut(state: AuthState) {
            state.user = null;
            state.token = null;
        }
    }
})

export const {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer;

import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slice/AuthSlice";
import {authApi} from "../api/authApi";


const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>
export const selectCurrentToken = (state: RootState) => state.auth.token
export const isUserLoggedIn = (state: RootState) => state.auth.token

export default store;
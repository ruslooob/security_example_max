import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slice/AuthSlice";
import {apiSlice} from "../api/apiSlice";


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>
export const selectCurrentToken = (state: RootState) => state.auth.token

export default store;
import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slice/AuthSlice";


const index = configureStore({
    reducer: {
        auth: authReducer
    },
    devTools: true
});

export default index;
import {BaseQueryApi, createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {QueryReturnValue} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {LoginPayload, logOut, RegisterPayload, Role, setCredentials} from "../store/slice/AuthSlice";
import {RootState} from "../store";


const baseQuery = fetchBaseQuery(
    // todo разобраться, почему не получается использовать переменную среды
    {
        baseUrl: 'http://localhost:8080/api/v1/auth/',
        // credentials: 'include',
        prepareHeaders: (headers: Headers, {getState}) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }
)

// todo fix later
const baseQueryWithReAuth = async (args: string, api: BaseQueryApi, extraOptions: any) => {
    let result: QueryReturnValue = await baseQuery(args, api, extraOptions);
    //@ts-ignore
    if (result?.error?.originalStatus === 403) {
        console.log('send refresh token')
        // send refresh token to get new access token
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.error?.data) {
            const {login, password} = (api.getState() as RootState).auth
            // @ts-ignore
            const token = refreshResult.token;
            // store new token
            // @ts-ignore
            api.dispatch(setCredentials({login, password, token}))
            // retry the original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }
    return result;
}

export interface LoginResponse {
    token: string,
    role: Role,
}

export interface RegisterResponse {
    token: string
}

export const authApi = createApi({
        baseQuery,
        endpoints: builder => ({
            login: builder.mutation<LoginResponse, LoginPayload>({
                query: (payload: LoginPayload) => ({
                    url: 'login',
                    body: payload,
                    method: 'POST'
                })
            }),
            register: builder.mutation<RegisterResponse, RegisterPayload>({
                query: (payload: RegisterPayload) => ({
                    url: 'register',
                    body: payload,
                    method: 'POST'
                })
            })
        }),
    }
)

export const {useLoginMutation, useRegisterMutation} = authApi;
import {object, string} from "zod";

// todo rewrite with constants
const registerSchema = object({
    lastName: string()
        .min(1, 'Минимальный размер фамилии 1 символ')
        .max(32, 'Максимальный размер фамилии 32 символа'),
    firstName: string()
        .min(1, 'Минимальный размер имени 1 символ')
        .max(32, 'Максимальный размер имени 32 символа'),
    middleName: string()
        .min(1, 'Минимальный размер имени 1 символ')
        .max(32, 'Максимальный размер имени 32 символа')
        .nullable(),
    login: string()
        .min(3, 'Минимальный размер логина 3 симолва')
        .max(32, 'Максимальный размер логина 32 символа'),
    password: string()
        .min(6, 'Минимальный размер пароля 6 символов')
        .max(150, 'Максимальный размер пароля 150 символов'),
    repeatPassword: string()
        .min(6, 'Минимальный размер пароля 6 символов')
        .max(150, 'Максимальный размер пароля 150 символов'),
}).refine((data) => data.password === data.repeatPassword, {
    path: ['repeatPassword'],
    message: 'Пароли не совпадают'
})

const loginSchema = object({
    login: string()
        .min(3, 'Минимальный размер логина 3 симолва')
        .max(32, 'Максимальный размер логина 32 символа'),
    password: string()
        .min(6, 'Минимальный размер пароля 6 символов')
        .max(150, 'Максимальный размер пароля 150 символов'),
})

export {registerSchema, loginSchema};
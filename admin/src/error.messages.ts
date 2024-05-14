class ErrorMessage {
    [key:string]:string
}

export const ERROR_MESSAGES:ErrorMessage = {
    "INCORRECT_PASSWORD":"Неверный пароль",
    "USER_NOT_FOUND":"Пользователь с таким Email не найден",
    "USER_ALREADY_EXISTS":"Пользователь с таким Email уже существует",
}
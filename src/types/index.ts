export type UserLogin = {
    email: string,
    password: string
}

export type UserAuthActive = {
    token: string,
    name: string,
    email: string,
}

export type ErrorApi = {
    error: string
}
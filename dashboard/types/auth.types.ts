export interface IRegister {
    email: string
    password: string
    confirmPassword: string
}

export interface ILogin {
    email: string
    password: string
}

export interface IToken {
    access_token: string
    token_type: string
}

export interface IUser {
    id: string
    email: string
}

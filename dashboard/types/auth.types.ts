export interface IRegister {
    email: string
    password: string
    confirmPassword: string
}

export interface ILogin {
    email: string
    password: string
}

export interface TokenResponse {
    access_token: string
    token_type: string
}

export interface UserResponse {
    id: string
    email: string
}

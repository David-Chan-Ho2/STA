import { ILogin, IRegister } from "@/types/auth.types"
import axios from "axios"
import { authAxios, BASE_URL } from "./base.api"

const AUTH_URL = BASE_URL + "/auth"

const REGISTER_EMAIL_URL = AUTH_URL + "/email/register"
const LOGIN_EMAIL_URL = AUTH_URL + "/email/login"

const REGISTER_SSO_URL = AUTH_URL + "/sso/callback"
const LOGIN_SSO_URL = AUTH_URL + "/sso/login"

const LOGOUT_URL = AUTH_URL + "/logout"
const ME_URL = AUTH_URL + "/me"

export const registerEmailAPI = async (form: IRegister) => {
    const res = await axios.post(REGISTER_EMAIL_URL, form)
    return res.data
}

export const loginEmailAPI = async (form: ILogin) => {
    const res = await axios.post(LOGIN_EMAIL_URL, form)
    return res.data
}

export const registerSSOAPI = async (form: IRegister) => {
    const res = await axios.post(REGISTER_SSO_URL, form)
    return res.data
}

export const loginSSOAPI = async (form: ILogin) => {
    const res = await axios.post(LOGIN_SSO_URL, form)
    return res.data
}

export const getMeAPI = async () => {
    const res = await authAxios.get(ME_URL)
    return res.data
}

export const logoutAPI = async () => {
    await authAxios.post(LOGOUT_URL)
}

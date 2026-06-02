import { ILogin, IRegister } from '@/types/auth.types'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"
const BASE_URL = API_URL + "/api"

const AUTH_URL = BASE_URL + "/auth"
const REGISTER_URL = AUTH_URL + "/register"
const LOGIN_URL = AUTH_URL + "/login"

const registerAPI = async (form: IRegister) => {
    const res = await axios.post(REGISTER_URL, form)
    const data = await res.data
    return data
}
const loginAPI = async (form: ILogin) => {
    const res = await axios.post(LOGIN_URL, form)
    const data = await res.data
    return data
}

export default {
    register: registerAPI,
    login: loginAPI
}
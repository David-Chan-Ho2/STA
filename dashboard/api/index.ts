import { ILogin, IRegister } from '@/types/auth.types'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"
const BASE_URL = API_URL + "/api"

const AUTH_URL = BASE_URL + "/auth"
const REGISTER_URL = AUTH_URL + "/register"
const LOGIN_URL = AUTH_URL + "/login"
const ME_URL = AUTH_URL + "/me"

const authAxios = axios.create()

authAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

const registerAPI = async (form: IRegister) => {
    const res = await axios.post(REGISTER_URL, form)
    return res.data
}

const loginAPI = async (form: ILogin) => {
    const res = await axios.post(LOGIN_URL, form)
    return res.data
}

const getMeAPI = async () => {
    const res = await authAxios.get(ME_URL)
    return res.data
}

export default {
    register: registerAPI,
    login: loginAPI,
    getMe: getMeAPI,
}
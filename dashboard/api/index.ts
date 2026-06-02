import { ILogin, IRegister } from '@/types/auth.types'
import axios from 'axios'

const BASE_URL = "http://localhost:8000/api"

const AUTH_URL = BASE_URL + "/auth"
const REGISTER_URL = AUTH_URL + "/register"
const LOGIN_URL = AUTH_URL + "/login"

const registerAPI = (form: IRegister) => axios.post(REGISTER_URL, form).then(res => res.data)
const loginAPI = (form: ILogin) => axios.post(LOGIN_URL, form).then(res => res.data)

export default {
    register: registerAPI,
    login: loginAPI
}
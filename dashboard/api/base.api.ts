import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"
export const BASE_URL = API_URL + "/api"

export const authAxios = axios.create()

authAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const fetcher = async (url: string) => {
    const { data } = await authAxios.get(url)
    return data
}

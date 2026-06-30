import { IDevice } from "@/types/devices.types"
import useSWR from "swr"
import { authAxios, BASE_URL, fetcher } from "./base.api"

const DEVICES_URL = BASE_URL + "/devices"

export const getDevicesAPI = () => {
    const { data, mutate, error, isLoading } = useSWR<IDevice[]>(DEVICES_URL, fetcher)
    return {
        devices: data,
        mutate,
        isLoading,
        error,
    }
}

export const getDeviceAPI = (id: string) => {
    const { data, error, isLoading } = useSWR<IDevice>(`${DEVICES_URL}/${id}`, fetcher)
    return {
        device: data,
        isLoading,
        error,
    }
}

export const claimDeviceAPI = async (claimCode: string, orgId: string): Promise<IDevice> => {
    const { data } = await authAxios.post<IDevice>(`${DEVICES_URL}/claim/${claimCode}`, { org_id: orgId })
    return data
}

export const deleteDeviceAPI = async (id: string): Promise<void> => {
    await authAxios.delete(`${DEVICES_URL}/${id}`)
}

export const getDeviceStatsAPI = () => {
    const { data, error, isLoading } = useSWR(`${DEVICES_URL}/stats`, fetcher)
    return {
        stats: data,
        isLoading,
        error,
    }
}

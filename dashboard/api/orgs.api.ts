import useSWR from "swr"
import { BASE_URL, authAxios, fetcher } from "./base.api"
import { IOrg, IOrgUser } from "@/types/orgs.types"
import { IDevice } from "@/types/devices.types"

const ORGS_URL = BASE_URL + "/orgs"

export const getOrgsAPI = () => {
    const { data, mutate, error, isLoading } = useSWR<IOrg[]>(ORGS_URL, fetcher)
    return {
        orgs: data,
        mutate,
        isLoading,
        error,
    }
}

export const getOrgAPI = (id: string) => {
    const { data, error, isLoading, mutate } = useSWR<IOrg>(`${ORGS_URL}/${id}`, fetcher)
    return {
        org: data,
        isLoading,
        error,
        mutate,
    }
}

export const getOrgUsersAPI = (id: string) => {
    const { data, error, isLoading, mutate } = useSWR<IOrgUser[]>(`${ORGS_URL}/${id}/users`, fetcher)
    return {
        users: data,
        isLoading,
        error,
        mutate,
    }
}

export const createOrgAPI = async (name: string): Promise<IOrg> => {
    const { data } = await authAxios.post<IOrg>(ORGS_URL, { name })
    return data
}

export const updateOrgAPI = async (id: string, name: string): Promise<IOrg> => {
    const { data } = await authAxios.patch<IOrg>(`${ORGS_URL}/${id}`, { name })
    return data
}

export const deleteOrgAPI = async (id: string): Promise<void> => {
    await authAxios.delete(`${ORGS_URL}/${id}`)
}

export const addUserToOrgAPI = async (orgId: string, userId: string): Promise<IOrg> => {
    const { data } = await authAxios.post<IOrg>(`${ORGS_URL}/${orgId}/users/${userId}`)
    return data
}

export const removeUserFromOrgAPI = async (orgId: string, userId: string): Promise<IOrg> => {
    const { data } = await authAxios.delete<IOrg>(`${ORGS_URL}/${orgId}/users/${userId}`)
    return data
}

export const getOrgDevicesAPI = (orgId: string) => {
    const { data, error, isLoading, mutate } = useSWR<IDevice[]>(`${ORGS_URL}/${orgId}/devices`, fetcher)
    return {
        devices: data,
        isLoading,
        error,
        mutate,
    }
}

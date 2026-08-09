import { IDevice } from "@/types/devices.types"
import { IOrg, IOrgUser } from "@/types/organizations.types"
import useSWR from "swr"
import { BASE_URL, authAxios, fetcher } from "./base.api"

const ORGANIZATIONS_URL = BASE_URL + "/organizations"

export const getOrgsAPI = () => {
    const { data, mutate, error, isLoading } = useSWR<IOrg[]>(ORGANIZATIONS_URL, fetcher)
    return {
        orgs: data,
        mutate,
        isLoading,
        error,
    }
}

export const getOrgAPI = (id: string) => {
    const { data, error, isLoading, mutate } = useSWR<IOrg>(`${ORGANIZATIONS_URL}/${id}`, fetcher)
    return {
        org: data,
        isLoading,
        error,
        mutate,
    }
}

export const getOrgUsersAPI = (id: string) => {
    const { data, error, isLoading, mutate } = useSWR<IOrgUser[]>(`${ORGANIZATIONS_URL}/${id}/users`, fetcher)
    return {
        users: data,
        isLoading,
        error,
        mutate,
    }
}

export const createOrgAPI = async (name: string): Promise<IOrg> => {
    const { data } = await authAxios.post<IOrg>(ORGANIZATIONS_URL, { name })
    return data
}

export const updateOrgAPI = async (id: string, name: string): Promise<IOrg> => {
    const { data } = await authAxios.patch<IOrg>(`${ORGANIZATIONS_URL}/${id}`, { name })
    return data
}

export const deleteOrgAPI = async (id: string): Promise<void> => {
    await authAxios.delete(`${ORGANIZATIONS_URL}/${id}`)
}

export const addUserToOrgAPI = async (orgId: string, userId: string): Promise<IOrg> => {
    const { data } = await authAxios.post<IOrg>(`${ORGANIZATIONS_URL}/${orgId}/users/${userId}`)
    return data
}

export const removeUserFromOrgAPI = async (orgId: string, userId: string): Promise<IOrg> => {
    const { data } = await authAxios.delete<IOrg>(`${ORGANIZATIONS_URL}/${orgId}/users/${userId}`)
    return data
}

export const getOrgDevicesAPI = (orgId: string) => {
    const { data, error, isLoading, mutate } = useSWR<IDevice[]>(`${ORGANIZATIONS_URL}/${orgId}/devices`, fetcher)
    return {
        devices: data,
        isLoading,
        error,
        mutate,
    }
}

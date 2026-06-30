import { IDevice } from "./devices.types"

export interface IOrgUser {
    id: string
    email: string
}

export interface IOrg {
    id: string
    name: string
    users: IOrgUser[]
    devices: IDevice[]
}

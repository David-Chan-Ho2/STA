import ISensorReading from "./sensor_reading";

export interface IDevice {
    id: string
    user_id?: string
    name: string
    location: string
    serial_number: string
    claim_code?: string
    claimed_at?: any
    status: string
    created_at: string
    readings: ISensorReading[]
}
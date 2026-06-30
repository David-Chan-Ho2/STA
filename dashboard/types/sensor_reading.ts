interface ISensorType {
    id: string
    name: string
    unit: string
}

interface ISensorReading {
    id: string
    device_id: string
    sensor_type_id: string
    value: number
    time: string
    type: ISensorType
}

export default ISensorReading

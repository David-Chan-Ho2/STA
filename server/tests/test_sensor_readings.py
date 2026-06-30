import uuid
from fastapi.testclient import TestClient
from sqlalchemy import delete as sql_delete

from config.database import SessionLocal
from models.SensorReading import SensorReading

API_URL = "/api/sensor_readings"


def test_get_all_sensor_readings(client: TestClient):
    response = client.get(API_URL)
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_sensor_reading(client: TestClient, test_sensor_reading: dict):
    response = client.get(f"{API_URL}/{test_sensor_reading['id']}")
    assert response.status_code == 200

    data = response.json()
    assert data['id'] == test_sensor_reading['id']
    assert data['value'] == test_sensor_reading['value']
    assert 'device' in data
    assert 'type' in data
    assert 'time' in data


def test_get_sensor_reading_not_found(client: TestClient):
    response = client.get(f"{API_URL}/{uuid.uuid4()}")
    assert response.status_code == 404


def test_create_sensor_reading(client: TestClient, test_device: dict, test_sensor_type: dict):
    response = client.post(API_URL, json={
        'device_id': test_device['id'],
        'sensor_type_id': test_sensor_type['id'],
        'value': 23.5
    })
    assert response.status_code == 201

    data = response.json()
    assert data['device_id'] == test_device['id']
    assert data['sensor_type_id'] == test_sensor_type['id']
    assert data['value'] == 23.5
    assert 'id' in data
    assert 'time' in data

    with SessionLocal() as db:
        db.execute(sql_delete(SensorReading).where(SensorReading.id == uuid.UUID(data['id'])))
        db.commit()


def test_create_sensor_reading_device_not_found(client: TestClient, test_sensor_type: dict):
    response = client.post(API_URL, json={
        'device_id': str(uuid.uuid4()),
        'sensor_type_id': test_sensor_type['id'],
        'value': 10.0
    })
    assert response.status_code == 404


def test_create_sensor_reading_sensor_type_not_found(client: TestClient, test_device: dict):
    response = client.post(API_URL, json={
        'device_id': test_device['id'],
        'sensor_type_id': str(uuid.uuid4()),
        'value': 10.0
    })
    assert response.status_code == 404


def test_create_batch_sensor_readings(client: TestClient, test_device: dict, test_sensor_type: dict):
    response = client.post(f"{API_URL}/batch", json={
        'readings': [
            {
                'device_id': test_device['id'],
                'sensor_type_id': test_sensor_type['id'],
                'value': 10.0
            },
            {
                'device_id': test_device['id'],
                'sensor_type_id': test_sensor_type['id'],
                'value': 20.0
            },
        ]
    })
    assert response.status_code == 201

    data = response.json()
    assert data['inserted'] == 2

    with SessionLocal() as db:
        db.execute(
            sql_delete(SensorReading).where(
                SensorReading.device_id == uuid.UUID(test_device['id']),
                SensorReading.sensor_type_id == uuid.UUID(test_sensor_type['id']),
            )
        )
        db.commit()


def test_create_batch_device_not_found(client: TestClient, test_sensor_type: dict):
    response = client.post(f"{API_URL}/batch", json={
        'readings': [
            {
                'device_id': str(uuid.uuid4()),
                'sensor_type_id': test_sensor_type['id'],
                'value': 10.0
            }
        ]
    })
    assert response.status_code == 404


def test_create_batch_sensor_type_not_found(client: TestClient, test_device: dict):
    response = client.post(f"{API_URL}/batch", json={
        'readings': [
            {
                'device_id': test_device['id'],
                'sensor_type_id': str(uuid.uuid4()),
                'value': 10.0
            }
        ]
    })
    assert response.status_code == 404


def test_update_sensor_reading_not_allowed(client: TestClient, test_sensor_reading: dict):
    response = client.patch(f"{API_URL}/{test_sensor_reading['id']}", json={'value': 99.9})
    assert response.status_code == 405


def test_delete_sensor_reading_not_allowed(client: TestClient, test_sensor_reading: dict):
    response = client.delete(f"{API_URL}/{test_sensor_reading['id']}")
    assert response.status_code == 405

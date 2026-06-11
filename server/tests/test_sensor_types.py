import uuid
from fastapi.testclient import TestClient

API_URL = "/api/sensor_types"

def test_get_all_sensor_types(client: TestClient):
    response = client.get(API_URL)

    assert response.status_code == 200

    data = response.json()
    isinstance(data, list)

def test_create_sensor_type(client: TestClient):
    name = 'Temperature in F'
    unit = 'F'

    response = client.post(API_URL, json={
        'name': name,
        'unit': unit
    })
    
    assert response.status_code == 201

    data = response.json()
    assert data['name'] == name
    assert data['unit'] == unit
    assert 'id' in data
    client.delete(f"{API_URL}/{data['id']}")

def test_get_sensor_type(client: TestClient, test_sensor_type: dict):
    response = client.get(f"{API_URL}/{test_sensor_type['id']}")

    assert response.status_code == 200

    data = response.json()
    assert data['id'] == test_sensor_type['id']
    assert data['name'] == test_sensor_type['name']
    assert data['unit'] == test_sensor_type['unit']

def test_get_sensor_type_not_found(client: TestClient):
    response = client.get(f"{API_URL}/{uuid.uuid4()}")

    assert response.status_code == 404

def test_update_sensor_type_full(client: TestClient, test_sensor_type: dict):
    name = 'new_name'
    unit = 'new_unit'

    response = client.patch(f"{API_URL}/{test_sensor_type['id']}", json={
        'name': name,
        'unit': unit
    })

    assert response.status_code == 200
    
    data = response.json()
    assert data['name'] == name
    assert data['unit'] == unit
    assert data['id'] == test_sensor_type['id']

def test_update_sensor_type_partial(client: TestClient, test_sensor_type: dict):
    name = 'new_name123'

    response = client.patch(f"{API_URL}/{test_sensor_type['id']}", json={
        'name': name,
    })

    assert response.status_code == 200
    
    data = response.json()
    assert data['name'] == name
    assert data['unit'] == test_sensor_type['unit']
    assert data['id'] == test_sensor_type['id']

def test_update_not_found(client: TestClient):
    response = client.patch(f"{API_URL}/{uuid.uuid4()}", json={'name': 'new_name'})

    assert response.status_code == 404

def test_delete_sensor_type(client: TestClient):
    name = 'second_name'
    unit = 'second_unit'

    create_resp = client.post(API_URL, json={
        'name': name,
        'unit': unit
    })

    assert create_resp.status_code == 201

    create_data = create_resp.json()
    assert create_data['name'] == name
    assert create_data['unit'] == unit
    assert 'id' in create_data

    second_id = create_data['id']

    delete_resp = client.delete(f"{API_URL}/{second_id}")

    assert delete_resp.status_code == 204

    get_resp = client.get(f"{API_URL}/{second_id}")

    assert get_resp.status_code == 404


def test_delete_sensor_type_not_found(client: TestClient):
    response = client.delete(f"{API_URL}/{uuid.uuid4()}")

    assert response.status_code == 404
import uuid
from fastapi.testclient import TestClient

API_URL = "/api/devices"

def test_get_all_devices(client: TestClient):
    response = client.get(API_URL)
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_create_device(client: TestClient, test_user: dict):
    name = f"device_{uuid.uuid4().hex[:8]}"
    location = "Room A"
    response = client.post(API_URL, json={
        "user_id": test_user["id"],
        "name": name,
        "location": location,
    })
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == name
    assert data["location"] == location
    assert data["user_id"] == test_user["id"]
    assert data["user"]["id"] == test_user["id"]
    assert isinstance(data["readings"], list)
    client.delete(f"{API_URL}/{data['id']}")


def test_create_device_user_not_found(client: TestClient):
    response = client.post(API_URL, json={
        "user_id": str(uuid.uuid4()),
        "name": "orphan_device",
        "location": "Nowhere",
    })
    assert response.status_code == 404


def test_get_device_by_id(client: TestClient, test_device: dict):
    response = client.get(f"{API_URL}/{test_device['id']}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == test_device["id"]
    assert data["name"] == test_device["name"]
    assert data["location"] == test_device["location"]


def test_get_device_not_found(client: TestClient):
    response = client.get(f"{API_URL}/{uuid.uuid4()}")
    assert response.status_code == 404


def test_update_device_name_and_location(client: TestClient, test_device: dict):
    response = client.patch(f"{API_URL}/{test_device['id']}", json={
        "name": "updated_name",
        "location": "Updated Location",
    })
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "updated_name"
    assert data["location"] == "Updated Location"


def test_update_device_partial(client: TestClient, test_device: dict):
    original_location = test_device["location"]
    response = client.patch(f"{API_URL}/{test_device['id']}", json={"name": "partial_update"})
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "partial_update"
    assert data["location"] == original_location


def test_update_device_not_found(client: TestClient):
    response = client.patch(f"{API_URL}/{uuid.uuid4()}", json={"name": "ghost"})
    assert response.status_code == 404


def test_delete_device(client: TestClient, test_user: dict):
    create_resp = client.post(API_URL, json={
        "user_id": test_user["id"],
        "name": f"deletable_{uuid.uuid4().hex[:8]}",
        "location": "Temp",
    })
    assert create_resp.status_code == 201
    device_id = create_resp.json()["id"]

    delete_resp = client.delete(f"{API_URL}/{device_id}")
    assert delete_resp.status_code == 204

    get_resp = client.get(f"{API_URL}/{device_id}")
    assert get_resp.status_code == 404


def test_delete_device_not_found(client: TestClient):
    response = client.delete(f"{API_URL}/{uuid.uuid4()}")
    assert response.status_code == 404


def test_get_device_readings_empty(client: TestClient, test_device: dict):
    response = client.get(f"{API_URL}/{test_device['id']}/readings")
    assert response.status_code == 200
    assert response.json() == []

def test_get_device_readings_not_found(client: TestClient):
    response = client.get(f"{API_URL}/{uuid.uuid4()}/readings")
    assert response.status_code == 404

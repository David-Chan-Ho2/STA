import uuid
from fastapi.testclient import TestClient

API_URL = "/api/orgs"


def test_get_all_orgs(client: TestClient):
    response = client.get(API_URL)
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_create_org(client: TestClient):
    name = f"org_{uuid.uuid4().hex[:8]}"
    response = client.post(API_URL, json={"name": name})
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == name
    assert "id" in data
    assert "users" in data
    assert "devices" in data
    client.delete(f"{API_URL}/{data['id']}")


def test_get_org_by_id(client: TestClient, test_org: dict):
    response = client.get(f"{API_URL}/{test_org['id']}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == test_org["id"]
    assert data["name"] == test_org["name"]


def test_get_org_not_found(client: TestClient):
    response = client.get(f"{API_URL}/{uuid.uuid4()}")
    assert response.status_code == 404


def test_update_org_name(client: TestClient, test_org: dict):
    response = client.patch(f"{API_URL}/{test_org['id']}", json={"name": "renamed_org"})
    assert response.status_code == 200
    assert response.json()["name"] == "renamed_org"


def test_update_org_not_found(client: TestClient):
    response = client.patch(f"{API_URL}/{uuid.uuid4()}", json={"name": "ghost"})
    assert response.status_code == 404


def test_delete_org(client: TestClient):
    create_resp = client.post(API_URL, json={"name": f"deletable_{uuid.uuid4().hex[:8]}"})
    assert create_resp.status_code == 201
    org_id = create_resp.json()["id"]

    delete_resp = client.delete(f"{API_URL}/{org_id}")
    assert delete_resp.status_code == 204

    get_resp = client.get(f"{API_URL}/{org_id}")
    assert get_resp.status_code == 404


def test_delete_org_not_found(client: TestClient):
    response = client.delete(f"{API_URL}/{uuid.uuid4()}")
    assert response.status_code == 404


# --- User membership ---

def test_get_org_users_empty(client: TestClient, test_org: dict):
    response = client.get(f"{API_URL}/{test_org['id']}/users")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_add_user_to_org(client: TestClient, test_org: dict, test_user: dict):
    response = client.post(f"{API_URL}/{test_org['id']}/users/{test_user['id']}")
    assert response.status_code == 200
    data = response.json()
    user_ids = [u["id"] for u in data["users"]]
    assert test_user["id"] in user_ids


def test_add_user_to_org_user_not_found(client: TestClient, test_org: dict):
    response = client.post(f"{API_URL}/{test_org['id']}/users/{uuid.uuid4()}")
    assert response.status_code == 404


def test_add_user_to_org_org_not_found(client: TestClient, test_user: dict):
    response = client.post(f"{API_URL}/{uuid.uuid4()}/users/{test_user['id']}")
    assert response.status_code == 404


def test_remove_user_from_org(client: TestClient, test_org: dict, test_user: dict):
    client.post(f"{API_URL}/{test_org['id']}/users/{test_user['id']}")

    response = client.delete(f"{API_URL}/{test_org['id']}/users/{test_user['id']}")
    assert response.status_code == 200
    data = response.json()
    user_ids = [u["id"] for u in data["users"]]
    assert test_user["id"] not in user_ids


def test_remove_user_from_org_user_not_found(client: TestClient, test_org: dict):
    response = client.delete(f"{API_URL}/{test_org['id']}/users/{uuid.uuid4()}")
    assert response.status_code == 404


def test_remove_user_from_org_org_not_found(client: TestClient, test_user: dict):
    response = client.delete(f"{API_URL}/{uuid.uuid4()}/users/{test_user['id']}")
    assert response.status_code == 404


# --- Device listing ---

def test_get_org_devices(client: TestClient, test_org: dict, test_device: dict):
    response = client.get(f"{API_URL}/{test_org['id']}/devices")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    device_ids = [d["id"] for d in data]
    assert test_device["id"] in device_ids


def test_get_org_devices_org_not_found(client: TestClient):
    response = client.get(f"{API_URL}/{uuid.uuid4()}/devices")
    assert response.status_code == 404


def test_org_response_includes_devices(client: TestClient, test_org: dict, test_device: dict):
    response = client.get(f"{API_URL}/{test_org['id']}")
    assert response.status_code == 200
    data = response.json()
    device_ids = [d["id"] for d in data["devices"]]
    assert test_device["id"] in device_ids

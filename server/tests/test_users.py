import uuid
from fastapi.testclient import TestClient

API_URL = "/api/users"

def test_get_all_users(client: TestClient):
    response = client.get(API_URL)

    assert response.status_code == 200

    data = response.json()
    isinstance(data, list)

def test_get_user(client: TestClient, test_user: dict):
    response = client.get(f"{API_URL}/{test_user['id']}")

    assert response.status_code == 200

    data = response.json()
    assert data['id'] == test_user['id']
    assert data['email'] == test_user['email']

def test_get_user_not_found(client: TestClient):
    response = client.get(f"{API_URL}/{uuid.uuid4()}")

    assert response.status_code == 404

def test_post_user_invalid(client: TestClient):
    response = client.post(API_URL, json={
        'email': 'email@example.com'
    })

    assert response.status_code == 405

def test_update_user_invalid(client: TestClient, test_user: dict):
    response = client.patch(f"{API_URL}/{test_user['id']}", json={
        'email': 'email@example.com'
    })

    assert response.status_code == 405
def test_delete_user_invalid(client: TestClient, test_user: dict):
    response = client.delete(f"{API_URL}/{test_user['id']}")

    assert response.status_code == 405

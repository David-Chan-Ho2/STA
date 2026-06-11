import uuid
from fastapi.testclient import TestClient
from jose import jwt

from config.config import settings
from utils.auth import session as user_session

API_URL = "/api/auth"


def _unique_email() -> str:
    return f"testauth_{uuid.uuid4().hex[:8]}@example.com"


def _register(client: TestClient, email: str, password: str = "testpassword"):
    return client.post(f"{API_URL}/register", json={
        "email": email,
        "password": password,
        "confirmPassword": password,
    })


def _login(client: TestClient, email: str, password: str = "testpassword"):
    return client.post(f"{API_URL}/login", json={
        "email": email,
        "password": password,
    })


def _auth_headers(token: str) -> dict:
    return {"Authorization": f"Bearer {token}"}


def test_register_user(client: TestClient):
    email = _unique_email()
    response = _register(client, email)

    assert response.status_code == 201
    data = response.json()
    assert data["email"] == email
    assert "id" in data
    assert "devices" in data


def test_register_duplicate_email(client: TestClient):
    email = _unique_email()
    _register(client, email)
    response = _register(client, email)

    assert response.status_code == 409


def test_register_password_mismatch(client: TestClient):
    response = client.post(f"{API_URL}/register", json={
        "email": _unique_email(),
        "password": "testpassword",
        "confirmPassword": "different",
    })

    assert response.status_code == 409


def test_login_user(client: TestClient):
    email = _unique_email()
    _register(client, email)

    response = _login(client, email)

    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_wrong_password(client: TestClient):
    email = _unique_email()
    _register(client, email)

    response = client.post(f"{API_URL}/login", json={
        "email": email,
        "password": "wrongpassword",
    })

    assert response.status_code == 401


def test_login_unknown_email(client: TestClient):
    response = _login(client, _unique_email())

    assert response.status_code == 401


def test_get_me(client: TestClient):
    email = _unique_email()
    _register(client, email)
    token = _login(client, email).json()["access_token"]

    response = client.get(f"{API_URL}/me", headers=_auth_headers(token))

    assert response.status_code == 200
    data = response.json()
    assert data["email"] == email
    assert "id" in data
    assert "devices" in data


def test_get_me_no_token(client: TestClient):
    response = client.get(f"{API_URL}/me")

    assert response.status_code == 401


def test_get_me_invalid_token(client: TestClient):
    response = client.get(f"{API_URL}/me", headers=_auth_headers("invalid.token.here"))

    assert response.status_code == 401


def test_logout_user(client: TestClient):
    email = _unique_email()
    _register(client, email)
    token = _login(client, email).json()["access_token"]

    response = client.get(f"{API_URL}/logout", headers=_auth_headers(token))

    assert response.status_code == 200


def test_logout_invalidates_session(client: TestClient):
    email = _unique_email()
    _register(client, email)
    token = _login(client, email).json()["access_token"]

    client.get(f"{API_URL}/logout", headers=_auth_headers(token))

    response = client.get(f"{API_URL}/me", headers=_auth_headers(token))
    assert response.status_code == 401


def test_logout_no_token(client: TestClient):
    response = client.get(f"{API_URL}/logout")

    assert response.status_code == 401


def _session_id(token: str) -> str:
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    return payload["sid"]


def test_login_creates_redis_session(client: TestClient):
    email = _unique_email()
    _register(client, email)

    token = _login(client, email).json()["access_token"]
    sid = _session_id(token)

    session_data = user_session.get_session(sid)
    assert session_data is not None
    assert session_data["user_email"] == email
    assert "user_id" in session_data
    assert "created_at" in session_data


def test_login_session_contains_correct_user(client: TestClient):
    email = _unique_email()
    user_data = _register(client, email).json()
    token = _login(client, email).json()["access_token"]
    sid = _session_id(token)

    session_data = user_session.get_session(sid)
    assert session_data is not None
    assert session_data["user_id"] == user_data["id"]
    assert session_data["user_email"] == email


def test_logout_removes_redis_session(client: TestClient):
    email = _unique_email()
    _register(client, email)
    token = _login(client, email).json()["access_token"]
    sid = _session_id(token)

    assert user_session.get_session(sid) is not None

    client.get(f"{API_URL}/logout", headers=_auth_headers(token))

    assert user_session.get_session(sid) is None


def test_multiple_logins_create_independent_sessions(client: TestClient):
    email = _unique_email()
    _register(client, email)

    token1 = _login(client, email).json()["access_token"]
    token2 = _login(client, email).json()["access_token"]

    sid1 = _session_id(token1)
    sid2 = _session_id(token2)

    assert sid1 != sid2
    assert user_session.get_session(sid1) is not None
    assert user_session.get_session(sid2) is not None


def test_logout_only_invalidates_own_session(client: TestClient):
    email = _unique_email()
    _register(client, email)

    token1 = _login(client, email).json()["access_token"]
    token2 = _login(client, email).json()["access_token"]

    client.get(f"{API_URL}/logout", headers=_auth_headers(token1))

    assert user_session.get_session(_session_id(token1)) is None
    assert user_session.get_session(_session_id(token2)) is not None

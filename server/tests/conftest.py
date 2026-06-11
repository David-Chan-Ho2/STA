import uuid
import pytest
from fastapi.testclient import TestClient

from main import app
from config.database import SessionLocal
from crud.sensor_reading import sensor_reading_crud

@pytest.fixture(scope="module")
def client():
    return TestClient(app)

# async def get_redis():
#     return redis.Redis(host="localhost", port=6379, decode_responses=True)

# @pytest.fixture
# async def fake_redis():
#     r = fakeredis.aioredis.FakeRedis(decode_responses=True)
#     yield r
#     await r.aclose()

# @pytest.fixture
# async def redis_client(fake_redis):
#     async def override_get_redis():
#         return fake_redis

#     app.dependency_overrides[get_redis] = override_get_redis

#     async with AsyncClient(
#         transport=ASGITransport(app=app),
#         base_url="http://test"
#     ) as ac:
#         yield ac

#     app.dependency_overrides.clear()

@pytest.fixture(scope="module")
def test_user(client: TestClient):
    unique = uuid.uuid4().hex[:8]
    response = client.post("/api/auth/register", json={
        "email": f"testuser_{unique}@example.com",
        "password": "testpassword",
        "confirmPassword": "testpassword",
    })
    assert response.status_code == 201
    return response.json()


@pytest.fixture()
def test_device(client: TestClient, test_user: dict):
    response = client.post("/api/devices", json={
        "user_id": test_user["id"],
        "name": f"device_{uuid.uuid4().hex[:8]}",
        "location": "Test Location",
    })
    assert response.status_code == 201
    return response.json()


@pytest.fixture()
def test_sensor_type(client: TestClient):
    unique = uuid.uuid4().hex[:8]
    response = client.post("/api/sensor_types", json={
        "name": f"Temperature (C) {unique}",
        "unit": "C",
    })
    assert response.status_code == 201

    sensor_type = response.json()
    yield sensor_type
    client.delete(f"/api/sensor_types/{sensor_type['id']}")


@pytest.fixture()
def test_sensor_reading(client: TestClient, test_device: dict, test_sensor_type: dict):
    response = client.post("/api/sensor_readings", json={
        "device_id": test_device['id'],
        "sensor_type_id": test_sensor_type['id'],
        "value": 12.2,
    })
    assert response.status_code == 201

    reading = response.json()
    yield reading
    with SessionLocal() as db:
        sensor_reading_crud.delete(db, reading['id'])


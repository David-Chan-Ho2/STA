# STA Server

FastAPI backend with JWT authentication and PostgreSQL.

## Requirements

- Python 3.13+
- Docker (for PostgreSQL)

## Setup

1. Start the database:

   ```bash
   cd .. && docker compose up -d
   ```

2. Create a `.env` file in this directory:

   ```
   DATABASE_URL=postgresql://postgres:password@localhost:5432/sta
   SECRET_KEY=your-secret-key
   ```

3. Install dependencies:

   ```bash
   uv sync
   ```

4. Run the server:
   ```bash
   uv run main.py
   ```

The API will be available at `http://localhost:8000`. Interactive docs at `http://localhost:8000/docs`.

## API Endpoints

| Method | Path                 | Description              | Auth         |
| ------ | -------------------- | ------------------------ | ------------ |
| `POST` | `/api/user/register` | Register a new user      | No           |
| `POST` | `/api/user/login`    | Login, returns JWT token | No           |
| `GET`  | `/api/user/me`       | Get current user profile | Bearer token |

## Auth

Uses JWT Bearer tokens (HS256, 30 min expiry). After login, pass the token as:

```
Authorization: Bearer <token>
```

## Project Structure

```
server/
├── main.py              # App entry point, creates DB tables
├── api/endpoints/       # Route handlers
├── config/              # Database and settings config
├── models/              # SQLAlchemy ORM models
├── schemas/             # Pydantic request/response models
├── crud/                # Database queries
└── utils/auth.py        # JWT and password utilities
```

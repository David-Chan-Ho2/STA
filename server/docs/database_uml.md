# Database UML

```mermaid
erDiagram
    users {
        UUID id PK
        VARCHAR(255) email UK "NOT NULL"
        VARCHAR(255) password_hash "NOT NULL"
        TIMESTAMPTZ created_at "NOT NULL"
    }

    devices {
        UUID id PK
        UUID user_id FK "NOT NULL"
        VARCHAR name "NOT NULL"
        VARCHAR location "NOT NULL"
        TIMESTAMPTZ created_at "NOT NULL"
    }

    sensor_types {
        UUID id PK
        VARCHAR name UK "NOT NULL"
        VARCHAR unit "NOT NULL"
    }

    sensor_readings {
        UUID id PK
        TIMESTAMPTZ time PK "NOT NULL, TimescaleDB partition key"
        UUID device_id FK "NOT NULL"
        UUID sensor_type_id FK "NOT NULL"
        FLOAT value "NOT NULL"
    }

    users ||--o{ devices : "owns"
    devices ||--o{ sensor_readings : "produces"
    sensor_types ||--o{ sensor_readings : "classifies"
```

## Notes

- `users` ↔ `devices`: unique constraint on `(user_id, name)` — a user cannot have two devices with the same name.
- `sensor_readings` is a **TimescaleDB hypertable** partitioned by `time`. The primary key is composite `(id, time)`.
- Cascade delete-orphan is set on `users → devices` and `devices → sensor_readings`.

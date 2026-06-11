CREATE EXTENSION IF NOT EXISTS timescaledb;

SELECT create_hypertable(
    'sensor_readings',
    'time',
    if_not_exists => TRUE,
    migrate_data => TRUE
);
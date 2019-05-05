#!/bin/bash

echo "host replication all 0.0.0.0/0 md5" >> "$PGDATA/pg_hba.conf"

set -e

psql -v ON_ERROR_STOP=1 --username "zelda" --dbname "zelda" <<-EOSQL
    CREATE USER zelda REPLICATION LOGIN CONNECTION LIMIT 100 ENCRYPTED PASSWORD 'JZOwO$Q&De0Fp$2%k$6Bu7Gg^kPIf';
    CREATE DATABASE zelda;
    ALTER ROLE zelda SET client_encoding TO 'utf8';
    ALTER ROLE zelda SET default_transaction_isolation TO 'read committed';
    ALTER ROLE zelda SET timezone TO 'UTC';
    GRANT ALL PRIVILEGES ON DATABASE zelda TO zelda;
EOSQL

cat >> ${PGDATA}/postgresql.conf <<EOF
wal_level = hot_standby
archive_mode = on
archive_command = 'cd .'
max_wal_senders = 8
wal_keep_segments = 8
hot_standby = on
EOF

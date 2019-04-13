#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "zelda" --dbname "zelda" <<-EOSQL
    CREATE USER zelda WITH PASSWORD 'JZOwO$Q&De0Fp$2%k$6Bu7Gg^kPIf';
    CREATE DATABASE zelda;
    ALTER ROLE zelda SET client_encoding TO 'utf8';
    ALTER ROLE zelda SET default_transaction_isolation TO 'read committed';
    ALTER ROLE zelda SET timezone TO 'UTC';
    GRANT ALL PRIVILEGES ON DATABASE zelda TO zelda;
EOSQL

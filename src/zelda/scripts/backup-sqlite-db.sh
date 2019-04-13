#! /bin/bash

DATE=$(date +"%d-%m-%Y-%T")
sqlite3 ../db.sqlite3 .dump > ../backups/db-$DATE.sql

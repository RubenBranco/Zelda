#! /bin/bash

DATE=$(date +"%d-%m-%Y-%T")
python3 ../manage.py dumpdata --all > ../backups/db-$DATE.json

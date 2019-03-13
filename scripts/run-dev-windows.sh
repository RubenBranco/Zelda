#! /bin/bash

cd .. > /dev/null
source env.sh

export DEBUG=yes

python3 src/zelda/manage.py runserver

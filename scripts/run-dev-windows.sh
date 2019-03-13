#! /bin/bash

cd .. > /dev/null
source env.sh

export DEBUG=yes
export STATIC_DIR=''

python3 src/zelda/manage.py runserver

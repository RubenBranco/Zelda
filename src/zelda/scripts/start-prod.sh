#! /bin/bash

source $PROJECT_DIR/scripts/functions.sh

create_deps_dirs
collect_static
sleep 1m
migrate
cd $PROJECT_DIR
start_celery
start_prod

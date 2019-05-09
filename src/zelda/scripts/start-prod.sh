#! /bin/bash

source $PROJECT_DIR/scripts/functions.sh

create_deps_dirs
collect_static
sleep 1m
migrate
cd $PROJECT_DIR
start_celery_workers
sleep 5s
start_celery_beat
sleep 5s
start_prod

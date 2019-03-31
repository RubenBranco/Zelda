#! /bin/bash

cd $PROJECT_DIR

source scripts/functions.sh

create_deps_dirs
collect_static
start_prod

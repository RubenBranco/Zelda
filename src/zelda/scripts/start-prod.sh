#! /bin/bash

source $PROJECT_DIR/scripts/functions.sh

create_deps_dirs
collect_static
cd $PROJECT_DIR
start_prod

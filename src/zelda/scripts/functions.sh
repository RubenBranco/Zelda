#! /bin/bash

function create_deps_dirs {
    mkdir -p $PROJECT_DIR/deps/static
    mkdir -p $PROJECT_DIR/deps/src
}

function manage {
    python3 $PROJECT_DIR/manage.py "$@"
}

function collect_static {
    manage collectstatic --link --no-input
}

function start_dev {
    manage runserver 0.0.0.0:8000
}

function start_prod {
    gunicorn \
        --bind 0.0.0.0:8000 \
        --pid $PIDS_DIR/gunicorn.pid \
        --access-logfile $LOGS_DIR/access.log \
        --error-logfile $LOGS_DIR/error.log \
        --capture-output\
        --name zelda-gunicorn \
        zelda.wsgi:application
}

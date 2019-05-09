#! /bin/bash

function create_deps_dirs {
    mkdir -p $PROJECT_DIR/deps/static
    mkdir -p $PROJECT_DIR/deps/src
}

function manage {
    python3 $PROJECT_DIR/manage.py "$@"
}

function collect_static {
    manage collectstatic --no-input
}

function start_dev {
    manage runserver 0.0.0.0:8000
}

function start_celery_workers {
    celery -A zelda worker -l info > $LOGS_DIR/celery_worker.log 2>&1 &
}

function start_celery_beat {
    celery -A zelda beat -s /zelda/celery/celerybeat-schedule > $LOGS_DIR/celery_beat.log 2>&1 &
}

function migrate {
    manage makemigrations
    manage migrate
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

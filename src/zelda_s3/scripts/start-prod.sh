#! /bin/bash


function start_prod {
    gunicorn \
        --bind 0.0.0.0:8000 \
        --pid $PIDS_DIR/gunicorn.pid \
        --access-logfile $LOGS_DIR/access.log \
        --error-logfile $LOGS_DIR/error.log \
        --capture-output\
        --name zelda_s3-gunicorn \
        zelda_s3.wsgi:application
}

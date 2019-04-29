#! /bin/bash


cd $PROJECT_DIR
python3 manage.py migrate django_cron
python3 manage.py runcrons
gunicorn \
    --bind 0.0.0.0:8000 \
    --pid $PIDS_DIR/gunicorn.pid \
    --access-logfile $LOGS_DIR/access.log \
    --error-logfile $LOGS_DIR/error.log \
    --capture-output \
    --name zelda_sys-gunicorn \
    zelda_sys.wsgi:application

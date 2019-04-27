FROM python:3.6

WORKDIR /zelda_sys

RUN mkdir code/ pids/

COPY src/zelda_sys \
     docker/zelda_sys/requirements.txt \
     docker/zelda_sys/gpg/gpg.key \
     code/

RUN pip3 install -r code/requirements.txt

RUN rm code/requirements.txt

VOLUME [ \
    "/zelda_sys/logs", \
    "/zelda_sys/backups" \
]

ENV PIDS_DIR=/zelda_sys/pids \
    LOGS_DIR=/zelda_sys/logs \
    GPG_KEY_PATH=/zelda_sys/code/gpg.key \
    BACKUP_DIR=/zelda_sys/backups \
    PROJECT_DIR=/zelda_sys/code

ENTRYPOINT [ "code/scripts/start-prod.sh" ]

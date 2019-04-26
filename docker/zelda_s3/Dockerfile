FROM python:3.6

WORKDIR /zelda_s3

RUN mkdir code/ pids/

COPY src/zelda_s3 \
     docker/zelda_s3/requirements.txt \
     code/

RUN pip3 install -r code/requirements.txt

RUN rm code/requirements.txt

VOLUME [ \
    "/zelda_s3/logs", \
    "/zelda_s3/data" \
]

ENV MEDIA_ROOT=/zelda_s3/data \
    PIDS_DIR=/zelda_s3/pids \
    LOGS_DIR=/zelda_s3/logs

ENTRYPOINT [ "code/scripts/start-prod.sh" ]

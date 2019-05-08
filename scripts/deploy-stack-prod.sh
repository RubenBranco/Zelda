#! /bin/bash

export DJANGO_REPLICAS=6
export DJANGO_S3_REPLICAS=2
export RABBITMQ_REPLICAS=2

docker stack deploy -c docker/compose/docker-compose-prod.yml zelda

#! /bin/bash

cd .. > /dev/null
source env.sh

docker build -f docker/zelda/Dockerfile-prod -t zelda:latest .

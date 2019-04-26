#! /bin/bash

cd .. > /dev/null
source env.sh

docker build -f docker/zelda/Dockerfile-dev -t zelda:latest-dev .

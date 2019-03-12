#! /bin/bash

cd .. > /dev/null
source env.sh

docker -f Dockerfile-dev -t zelda:latest-dev .

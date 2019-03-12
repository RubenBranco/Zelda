#! /bin/bash

cd .. > /dev/null
source env.sh

docker build -f Dockerfile-dev -t zelda:latest-dev .

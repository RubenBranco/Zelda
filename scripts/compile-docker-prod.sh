#! /bin/bash

cd .. > /dev/null
source env.sh

docker build -f Dockerfile-prod -t zelda:latest .

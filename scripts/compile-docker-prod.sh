#! /bin/bash

cd .. > /dev/null
source env.sh

docker -f Dockerfile-prod -t zelda:latest .

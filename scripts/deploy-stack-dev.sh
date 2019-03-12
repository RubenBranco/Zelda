#! /bin/bash

cd .. > /dev/null
source env.sh

docker swarm init
docker stack deploy -c docker-compose-dev.yml zelda

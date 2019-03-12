#! /bin/bash

cd .. > /dev/null
source env.sh

docker run -p 8000:8000 -v $CODE_DIR:/zelda/code:rw zelda:latest-dev

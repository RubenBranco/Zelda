#! /bin/bash

cd .. > /dev/null

npm install .

if ! test -f src/zelda/deps/static/css/bootstrap.min.css; then
    ln -f node_modules/bootstrap/dist/css/bootstrap.min.css src/zelda/deps/static/css/bootstrap.min.css
fi

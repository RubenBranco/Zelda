#! /bin/bash

pkill -f locust
kill -15 $(cat tests/auth.pid)
rm tests/auth.pid

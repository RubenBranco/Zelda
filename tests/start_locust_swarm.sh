#! /bin/bash

locust -f tests/locustfile.py --master --host=https://zelda-edu.me > tests/master.log 2>&1 &
locust -f tests/locustfile.py --slave --host=https://zelda-edu.me &
locust -f tests/locustfile.py --slave --host=https://zelda-edu.me &


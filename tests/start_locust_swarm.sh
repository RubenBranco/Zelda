#! /bin/bash

python3 tests/auth.py 9022 tests/student_auth.txt tests/prof_auth.txt &
echo $! > tests/auth.pid

locust -f tests/locustfile.py --master --host=http://localhost:8000 > tests/master.log 2>&1 &
locust -f tests/locustfile.py --slave --host=http://localhost:8000 &
locust -f tests/locustfile.py --slave --host=http://localhost:8000 &

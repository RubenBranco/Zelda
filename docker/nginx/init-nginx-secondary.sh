#! /bin/bash

/usr/sbin/sshd -D

while :; do
    sleep 6h;
    nginx -s reload;
done &

sleep 2m
nginx -g 'daemon off;'


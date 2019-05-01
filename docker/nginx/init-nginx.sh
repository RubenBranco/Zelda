#! /bin/bash

while :; do
    sleep 6h;
    nginx -s reload;
done &

sleep 1m
nginx -g 'daemon off;'


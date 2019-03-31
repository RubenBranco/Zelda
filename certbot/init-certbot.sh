#! /bin/bash

sleep 1m

domains=(
    zelda-edu.me
)

rsa_key_size=4096
staging=0
email="ruben.branco@outlook.pt"

domain_args=""
for domain in "${domains[@]}"; do
    domain_args="$domain_args -d $domain"
done

if [ $staging != "0" ]; then staging_arg="--staging"; fi

certbot certonly --webroot -w /var/www/certbot \
    $staging_arg \
    --email $email \
    $domain_args \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal

trap exit TERM;
while :; do
    certbot renew;
    sleep 12h;
done;

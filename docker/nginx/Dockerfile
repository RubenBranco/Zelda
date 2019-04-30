FROM nginx:latest

COPY init-nginx.sh .

RUN rm /etc/nginx/conf.d/default.conf

VOLUME [ \
    "/etc/letsencrypt", \
    "/var/www/certbot", \
    "/zelda/logs", \
    "/zelda/static", \
    "/zelda/s3", \
    "/etc/nginx/conf.d" \
]

CMD [ "./init-nginx.sh" ]

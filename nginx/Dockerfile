FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

VOLUME [ \
    "/etc/letsencrypt", \
    "/var/www/certbot", \
    "/zelda/logs", \
    "/zelda/static", \
    "/etc/nginx/conf.d" \
]

CMD [ "./init-nginx.sh" ]

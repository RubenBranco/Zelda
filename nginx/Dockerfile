FROM nginx:latest

COPY conf.d/ /etc/nginx/conf.d/

COPY init-nginx.sh .

RUN rm /etc/nginx/conf.d/default.conf

VOLUME [ \
    "/etc/letsencrypt", \
    "/var/www/certbot", \
    "/zelda/logs", \
    "/zelda/static" \
]

CMD [ "./init-nginx.sh" ]

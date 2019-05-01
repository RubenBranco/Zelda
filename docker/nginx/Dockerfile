FROM nginx:latest

COPY init-nginx.sh .

COPY conf.d/zelda-edu.conf /etc/nginx/conf.d/zelda-edu.conf

RUN rm /etc/nginx/conf.d/default.conf

VOLUME [ \
    "/etc/letsencrypt", \
    "/var/www/certbot", \
    "/zelda/logs", \
    "/zelda/static", \
    "/zelda/s3" \
]

CMD [ "./init-nginx.sh" ]

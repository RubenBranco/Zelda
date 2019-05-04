FROM certbot/certbot

RUN apk add --no-cache bash gawk sed grep bc coreutils rsync sshpass

COPY init-certbot.sh .

VOLUME [ "/share/etc/letsencrypt" ]

ENTRYPOINT [ "./init-certbot.sh" ]

FROM certbot/certbot

RUN apk add --no-cache bash gawk sed grep bc coreutils

COPY init-certbot.sh .

ENTRYPOINT [ "./init-certbot.sh" ]

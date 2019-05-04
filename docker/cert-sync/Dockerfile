FROM debian

RUN apt update && apt install -y openssh-server

RUN mkdir /var/run/sshd
RUN echo -e "zelda2019\nzelda2019" | passwd root
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd
RUN echo "export VISIBLE=now" >> /etc/profile

EXPOSE 22

VOLUME [ "/etc/letsencrypt" ]

CMD ["/usr/sbin/sshd", "-D"]

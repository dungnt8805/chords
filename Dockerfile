FROM node:latest

EXPOSE 8080

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y \
  build-essential \
  curl \
  git \
  libfreetype6 \
  libfontconfig \
  sudo \
  supervisor \
  wget \
  zip

RUN mkdir -p /var/log/supervisor

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN mkdir -p /var/log/app && chmod a+w /var/log/app

RUN npm install -g \
 bower \
 grunt-cli \
 karma-cli \
 nodemon \
 mountebank \
 pm2 \
 gulp

ADD package.json /usr/local/lib/package.json

RUN cd /usr/local/lib && npm install

RUN /usr/sbin/useradd --create-home --home-dir /usr/local/nonroot --shell /bin/bash nonroot
RUN /usr/sbin/adduser nonroot sudo
RUN echo "nonroot ALL=NOPASSWD: ALL" >> /etc/sudoers

RUN chown -R nonroot /usr/local/lib/node_modules

COPY ./ /usr/local/nonroot/app
RUN chown -R nonroot /usr/local/nonroot/app

WORKDIR /usr/local/nonroot/app

USER nonroot

RUN bower install

CMD ["/usr/bin/supervisord"]
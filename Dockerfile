FROM node:7.1.0

MAINTAINER Mak Krnic <mak.krnic@fer.hr>

RUN mkdir /app
WORKDIR /app

RUN /bin/bash -l -c "npm install --global vue-cli"


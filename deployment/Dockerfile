# Builds Dockinfo Docker Image
#################################################

FROM node:latest

MAINTAINER Jam Risser
EXPOSE 8084

RUN apt-get -y update && apt-get -y upgrade

COPY ./package.json /opt/app/package.json
WORKDIR /opt/app/
RUN npm install

COPY ./ /opt/app/

ENTRYPOINT node app.js

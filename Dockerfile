FROM node:10.21.0-alpine3.11
ENV IONIC_VERSION 5.4.16
COPY . /usr/local/apprisen
WORKDIR /usr/local/apprisen
RUN npm install -g
RUN npm install -g ionic@${IONIC_VERSION}
RUN npm rebuild node-sass
EXPOSE 8100
CMD ionic serve
FROM node:10.21.0-alpine3.11
ENV REACT_APP_SERVICE_BASE_URL "https://apprisen-facade-test.herokuapp.com"
ENV IONIC_VERSION 5.4.16
ENV IONIC_LAB_VERSION 2.0.18
COPY . /usr/local/apprisen/app
VOLUME .:/usr/local/apprisen/app
WORKDIR /usr/local/apprisen/app
RUN npm install -g
RUN npm install -g ionic@${IONIC_VERSION} serve @ionic/lab@${IONIC_LAB_VERSION}
RUN npm rebuild node-sass
EXPOSE 8100
CMD ionic build --prod && serve -s build -l 8100
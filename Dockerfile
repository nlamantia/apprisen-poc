FROM node:10.21.0-alpine3.11

# Set environment variables
ENV REACT_APP_SERVICE_BASE_URL "https://apprisen-facade-test.herokuapp.com"
ENV IONIC_VERSION 5.4.16
ENV IONIC_LAB_VERSION 2.0.18

# Copy source files to the image file system
COPY . /usr/apprisen/app

# Mount a volume between local system and container for real time code updates
VOLUME .:/usr/apprisen/app

# Set the working directory to where the code is located in the container
WORKDIR /usr/apprisen/app

# Install app dependencies
RUN npm install -g

# Install the Ionic CLI and serve npm package to serve the production build
RUN npm install -g ionic@${IONIC_VERSION} serve

# Install Ionic Labs for DEV purposes
RUN npm install -g semver @ionic/lab@${IONIC_LAB_VERSION}

# Rebuild SASS to ensure it compiles (especially if development system is not Linux)
RUN npm rebuild node-sass

# Open port 8100 on the container for web traffic
# NOTE: can be changed, but must be changed here and in the CMD line
EXPOSE 8100

# Command executed when docker run or docker-compose up is executed
CMD ionic build --prod && serve -s build -l 8100
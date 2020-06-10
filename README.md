# Apprisen Client Portal #

### Requirements ###
Ensure the following software is installed on your machine:
- Node/NPM
- Docker (TODO: add link)
- Docker Compose (should come with docker)

### For production: ###
##### Web #####
Run the following command in the project root directory:
```$xslt
$ docker build -t apprisen-portal .
```
This command creates the image locally. To run a container based on the image we created:
```$xslt
$ docker run -d --name "apprisen-client-portal" -p 8100:8100 apprisen-portal
```

##### Mobile #####
Coming soon...

### For development: ###
Run the following command in the project root directory:
```$xslt
$ docker-compose up -d
```
To see the web app, visit **localhost:8100** in your browser. (NOTE: Chrome and Firefox work best for this. Edge has issues.)

To see how the app would look on mobile, visit Ionic Labs at **localhost:8200** in your browser.

To take it down, run:
```$xslt
$ docker-compose down
```
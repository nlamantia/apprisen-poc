FROM maven:3.6.3-openjdk-8

# Copy source files to the image file system
COPY . /usr/local/apprisen/api

# Set the working directory to where the code is located in the container
WORKDIR /usr/local/apprisen/api

# Open port 8080 on the container for web traffic
EXPOSE 8080

# Command executed when docker run or docker-compose up is executed
CMD mvn spring-boot:run
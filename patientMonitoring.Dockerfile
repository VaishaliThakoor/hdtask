FROM node:14-alpine

# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /hd-task

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application files to the container
COPY . .

# Expose the port that the application listens on
EXPOSE 3000

# Start the patient monitoring microservice when the container starts
CMD [ "node", "patientMonitoring.js" ]

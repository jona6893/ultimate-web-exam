# use an official node.js runtime as the base image
FROM node:18-alpine

# set the working directory in the container
WORKDIR /app/client

# copy package.json to the working directory
COPY package.json .

# install dependencies
RUN npm install

# copy the rest of the application code
COPY . .

# expose the port the app runs on
EXPOSE 8080

# run the app in development mode
CMD ["npm", "run", "dev"]

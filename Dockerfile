# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript and Vite project
RUN npm run build

# Expose the port that your application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]

FROM node:22.13.0-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json yarn.lock ./


# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

# Build the TypeScript files
RUN yarn run build

# Expose port 8080
EXPOSE 8080

# Start the app
CMD yarn run start

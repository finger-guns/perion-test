# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml (if you have one) into the container
COPY package.json pnpm-lock.yaml* ./

# Install pnpm globally inside the container
RUN npm install -g pnpm

# Install project dependencies using pnpm
RUN pnpm install

# Copy the rest of the application into the container
COPY . .

# Specify the command to run when the container starts
CMD ["pnpm", "run", "start"]

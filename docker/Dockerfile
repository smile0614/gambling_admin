# Stage 1: Build the application
FROM node:20.14 AS builder

ARG AZURE_KEYVAULT
ARG AZURE_CLIENT_ID
ARG AZURE_CLIENT_SECRET
ARG AZURE_TENANT_ID

ENV AZURE_KEYVAULT=$AZURE_KEYVAULT

# Install system dependencies for Azure CLI
RUN apt-get update && \
    apt-get install -y ca-certificates curl apt-transport-https lsb-release gnupg && \
    curl -sL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor | tee /etc/apt/trusted.gpg.d/microsoft.asc.gpg > /dev/null && \
    echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/azure-cli.list && \
    apt-get update && \
    apt-get install -y azure-cli

RUN az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Copy the .env file
COPY docker/root/application.env ./.env

RUN chmod +x docker/root/initializeEnvfile.sh

RUN echo "InitializeEnvFIle=========="
RUN docker/root/initializeEnvfile.sh

# Build the Next.js application
RUN npm run build

# Stage 2: Serve the application
FROM node:20.14-alpine

# Set the working directory
WORKDIR /app

# Copy the build output and node_modules from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public

# Expose the port the app runs on
EXPOSE 3000

# Set environment variable to production
# ENV NODE_ENV=production

# Command to run the application
CMD ["npm", "start"]
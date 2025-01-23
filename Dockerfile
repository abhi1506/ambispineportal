
# Use an official Node.js image that includes Alpine for lightweight size
FROM node:20-alpine

# Install Nginx
RUN apk add --no-cache nginx

# Set working directory for the React app
WORKDIR /app/web

# Copy React app package.json and install dependencies
COPY web/package*.json ./
RUN npm install

# Copy React app source code and build
COPY web/ . 
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Set working directory for the backend
WORKDIR /app/company-portal

# Copy backend package.json and install dependencies
COPY company-portal/package*.json ./
RUN npm install

# Copy backend source code
COPY company-portal/ .

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80 8080

# Start Nginx and the backend using a process manager
CMD ["sh", "-c", "nginx && node /app/company-portal/server.js"]

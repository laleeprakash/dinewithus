
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package.json first for caching layer
COPY package.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Build the React app
RUN npm run build

# Install 'serve' globally to serve the static files
RUN npm install -g serve

# Set the command to run the app
CMD ["serve", "-s", "build"]

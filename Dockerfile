# Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the Vite dev server port
EXPOSE 5173

# Start Vite development server
CMD ["npm", "run", "dev", "--", "--host"]

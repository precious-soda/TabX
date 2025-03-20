# Use a stable Node.js version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app (including markdown-service folder)
COPY . .

# Set environment variables for Vite
ENV HOST=0.0.0.0
ENV PORT=5173

# Expose the Vite development server port
EXPOSE 5173

# Start Vite and allow external access
CMD ["npm", "run", "dev", "--", "--host"]

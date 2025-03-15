# Use official Node.js image
FROM node:18-alpine

# Set environment to production
ENV NODE_ENV=production

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy the source code
COPY . .

# Build the Vite app
RUN npm run build

# Expose port 5173 (default Vite preview port)
EXPOSE 5173

# Serve the built files using npx
CMD ["npx", "serve", "-s", "dist", "-l", "5173"]

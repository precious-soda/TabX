FROM node:18-alpine
WORKDIR /app
COPY package.json .
COPY services.json .
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
EXPOSE 5173
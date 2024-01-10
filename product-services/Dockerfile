FROM node:21-alpine 
RUN npm install -g typescript
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src 
RUN npm install
RUN npm run build
CMD ["npm", "start"]

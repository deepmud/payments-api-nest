FROM node:20-alpine

WORKDIR /app

# Copy package.json and install dependencies first (cache layer)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build NestJS
RUN npm run build

# Start app


CMD sh -c "npx prisma migrate dev --name init && node dist/main.js"


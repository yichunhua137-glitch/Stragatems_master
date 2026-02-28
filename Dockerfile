FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app

RUN npm install -g serve
COPY --from=builder /app/build ./build

EXPOSE 8080
CMD ["serve", "-s", "build", "-l", "tcp://0.0.0.0:8080"]

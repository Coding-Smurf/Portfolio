# ---- Build Stage ----
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Construir la app
RUN npm run build

# ---- Serve Stage ----
FROM node:22

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

ENV PORT=10000
EXPOSE 10000

CMD ["serve", "-s", "dist", "-l", "10000"]

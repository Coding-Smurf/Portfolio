# ---- Build Stage ----
FROM node:18 AS build

WORKDIR /app

# Copy dependency files and install deps
COPY package*.json ./
RUN npm ci

# Copy all source files
COPY . .

# Build the Vite project
RUN npm run build

# ---- Serve Stage ----
FROM node:18-alpine

WORKDIR /app

# Install a lightweight static file server
RUN npm install -g serve

# Copy built files from the build stage
COPY --from=build /app/dist ./dist

# Expose port 3000 (Render detects this automatically)
EXPOSE 3000

# Serve the built app
CMD ["serve", "-s", "dist", "-l", "3000"]

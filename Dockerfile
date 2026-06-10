# Stage 1: Build the frontend React application
FROM node:22-alpine AS frontend-builder
WORKDIR /app
# Copy root package.json for monorepo linking
COPY package.json ./
# Copy frontend configuration and source
COPY eldercare-frontend/package.json ./eldercare-frontend/
# Install frontend dependencies
RUN npm install --prefix eldercare-frontend
# Copy frontend source files
COPY eldercare-frontend/ ./eldercare-frontend/
# Build the production package
RUN npm run build --prefix eldercare-frontend

# Stage 2: Install backend production dependencies
FROM node:22-alpine AS backend-builder
WORKDIR /app
# Copy root package.json for monorepo linking
COPY package.json ./
# Copy backend configuration
COPY eldercare-backend/package.json ./eldercare-backend/
# Install only production dependencies
RUN npm install --prefix eldercare-backend --omit=dev

# Stage 3: Production runtime image
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8000

# Copy installed production backend dependencies
COPY --from=backend-builder /app/eldercare-backend/node_modules ./eldercare-backend/node_modules
# Copy backend source files
COPY eldercare-backend/ ./eldercare-backend/
# Copy built frontend static assets from builder stage
COPY --from=frontend-builder /app/eldercare-frontend/dist ./eldercare-frontend/dist

EXPOSE 8000
WORKDIR /app/eldercare-backend

CMD ["node", "server.js"]

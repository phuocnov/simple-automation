# ---------- base ----------
FROM node:20-alpine AS base
WORKDIR /app

COPY package*.json ./
RUN npm install

# ---------- development ----------
FROM base AS development
COPY . .
CMD ["npm", "run", "start:dev"]

# ---------- production ----------
FROM base AS production
COPY . .
RUN npm run build
CMD ["node", "dist/main.js"]

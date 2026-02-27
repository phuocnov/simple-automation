# ---------- base ----------
FROM node:20-alpine AS base
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.5 --activate

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY api/package.json ./api/
RUN pnpm install

# ---------- development ----------
FROM base AS development
COPY api ./api
WORKDIR /app/api
CMD ["pnpm", "run", "start:dev"]

# ---------- production ----------
FROM base AS production
COPY api ./api
WORKDIR /app/api
RUN pnpm run build
CMD ["node", "dist/main.js"]

# Development image for dustindavis.me — Eleventy with live reload.
FROM node:24-slim

ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH \
    CI=true

RUN corepack enable

WORKDIR /app

# Install dependencies in their own layer so source edits don't bust the cache.
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

EXPOSE 41180

CMD ["pnpm", "exec", "eleventy", "--serve", "--incremental", "--port=41180"]

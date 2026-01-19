FROM node:20-alpine

WORKDIR /app

# Install pnpm if needed
RUN corepack enable

COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; \
  else npm ci; \
  fi

COPY . .

EXPOSE 3000

CMD \
  if [ -f yarn.lock ]; then yarn dev; \
  elif [ -f pnpm-lock.yaml ]; then pnpm dev; \
  else npm run dev; \
  fi

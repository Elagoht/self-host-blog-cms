# === BUILDER IMAGE === #
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# === RUNTIME IMAGE === #
FROM node:22 AS runner

WORKDIR /app

COPY --from=builder /app/ ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

RUN mkdir -p /uploads

ENV PORT=2998

CMD ["npm", "start"]

FROM node:22-slim AS runner
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY . .
RUN npm install

RUN npm run build

RUN mkdir -p /uploads

ENV PORT=2998

CMD ["npm", "start"]

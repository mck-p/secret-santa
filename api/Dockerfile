FROM node:16 as BUILD

WORKDIR /app

COPY . .

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm && pnpm install && pnpm run build

FROM node:16 as RUNNER

WORKDIR /app

COPY package.json pnpm-lock.yaml tsconfig.json ./
COPY --from=BUILD /app/dist ./dist/
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm && pnpm install --production

EXPOSE 5000
EXPOSE 9464

ENV HTTP_PORT 5000
ENV METRICS_PORT 9464

CMD ["node", "-r", "tsconfig-paths/register", "dist/entry.js"]
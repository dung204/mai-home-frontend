FROM node:24.2.0-alpine AS base
RUN corepack enable pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml /usr/src/app/
COPY .husky /usr/src/app/.husky
WORKDIR /usr/src/app

FROM base AS prod-deps
ENV NODE_ENV=production
RUN pnpm install --prod --frozen-lockfile

FROM base AS dev-deps
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=dev-deps /usr/src/app/node_modules /usr/src/app/node_modules
COPY . /usr/src/app/
RUN pnpm run build

FROM base AS release
ENV NODE_ENV=production
COPY --from=build /usr/src/app/public /usr/src/app/public
COPY --from=build /usr/src/app/.next/standalone /usr/src/app/
COPY --from=build /usr/src/app/.next/static /usr/src/app/.next/static

EXPOSE 3000
CMD [ "node", "server.js" ]

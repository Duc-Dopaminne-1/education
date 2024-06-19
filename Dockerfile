FROM node:20.12-buster as base
RUN npm i -g pnpm@9.3.0
RUN npm i -g prisma

FROM base as builder
ENV CI=true
WORKDIR /app
RUN pnpm fetch
ADD . ./
RUN pnpm install
RUN pnpm run generate
RUN pnpm run build

FROM base as runner
ENV CI=true
WORKDIR /app
COPY package.json ./
COPY prisma ./prisma
RUN pnpm install

###################
# PRODUCTION
###################

FROM node:20.12-buster
# ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=runner /app/node_modules ./node_modules
#COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
EXPOSE 8080
CMD ["npm", "run", "start:prod", "--verbose"]
